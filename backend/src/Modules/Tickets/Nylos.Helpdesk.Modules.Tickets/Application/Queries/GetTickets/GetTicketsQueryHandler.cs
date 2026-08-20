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

        // filtering
        if (request.Status.HasValue)
        {
            query = query.Where(t => t.Status == request.Status.Value);
        }

        if (request.Priority.HasValue)
        {
            query = query.Where(t => t.Priority == request.Priority.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var page = request.Page < 1 ? 1 : request.Page;
        var pageSize = request.PageSize switch
        {
            < 1 => 10,
            > 100 => 100, // Clamp maximum page size to prevent memory overload
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