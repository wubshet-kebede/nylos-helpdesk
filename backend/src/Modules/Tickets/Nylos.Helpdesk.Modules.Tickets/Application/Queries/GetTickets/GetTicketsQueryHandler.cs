using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;
namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTickets;

internal sealed class GetTicketsQueryHandler
    : IRequestHandler<GetTicketsQuery, PagedResult<TicketSummaryDto>>
{
    private readonly TicketsDbContext _dbContext;

    public GetTicketsQueryHandler(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResult<TicketSummaryDto>> Handle(
        GetTicketsQuery request,
        CancellationToken cancellationToken)
    {
        var query = _dbContext.Tickets.AsNoTracking();

        // status filtering
        if (request.Status.HasValue)
        {
            query = query.Where(t => t.Status == request.Status.Value);
        }
        // priority filter 
        if (request.Priority.HasValue)
        {
            query = query.Where(t => t.Priority == request.Priority.Value);
        }
        //  Assignee Filter 
        if (request.AssigneeId.HasValue)
        {
            query = query.Where(t => t.AssigneeId == request.AssigneeId.Value);
        }
        // creator filter 
        if (request.CreatedById.HasValue)
        {
            query = query.Where(t => t.CreatedById == request.CreatedById.Value);
        }
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var searchTerm = request.Search.Trim().ToLower();
            query = query.Where(t =>
                t.Title.ToLower().Contains(searchTerm) ||
                t.Description.ToLower().Contains(searchTerm) ||
                t.TicketNumber.ToLower().Contains(searchTerm));
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var page = request.Page < 1 ? 1 : request.Page;
        var pageSize = request.PageSize switch
        {
            < 1 => 10,
            > 100 => 100,
            _ => request.PageSize
        };

        var items = await query
            .OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new TicketSummaryDto(
                t.Id,
                t.TicketNumber,
                t.Title,
                t.Description,
                t.Status,
                t.Priority,
                t.CreatedById,
                t.AssigneeId,
                t.CreatedAt
            ))
            .ToListAsync(cancellationToken);

        return new PagedResult<TicketSummaryDto>(items, page, pageSize, totalCount);
    }
}