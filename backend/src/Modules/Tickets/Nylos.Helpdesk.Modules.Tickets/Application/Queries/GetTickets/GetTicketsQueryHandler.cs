using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;
using Nylos.Helpdesk.Modules.Users.Contracts;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTickets;

internal sealed class GetTicketsQueryHandler
    : IRequestHandler<GetTicketsQuery, PagedResult<TicketSummaryDto>>
{
    private readonly TicketsDbContext _dbContext;
    private readonly IUserModuleContract _userContract;

    public GetTicketsQueryHandler(
        TicketsDbContext dbContext,
        IUserModuleContract userContract)
    {
        _dbContext = dbContext;
        _userContract = userContract;
    }

    public async Task<PagedResult<TicketSummaryDto>> Handle(
        GetTicketsQuery request,
        CancellationToken cancellationToken)
    {
        var query = _dbContext.Tickets.AsNoTracking();

        // Status filtering
        if (request.Status.HasValue)
        {
            query = query.Where(t => t.Status == request.Status.Value);
        }

        // Priority filtering
        if (request.Priority.HasValue)
        {
            query = query.Where(t => t.Priority == request.Priority.Value);
        }

        // Assignee filtering
        if (request.AssigneeId.HasValue)
        {
            query = query.Where(t => t.AssigneeId == request.AssigneeId.Value);
        }

        // Creator filtering
        if (request.CreatedById.HasValue)
        {
            query = query.Where(t => t.CreatedById == request.CreatedById.Value);
        }

        // Search filtering
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var searchTerm = request.Search.Trim().ToLower();
            query = query.Where(t =>
                t.Title.ToLower().Contains(searchTerm) ||
                t.Description.ToLower().Contains(searchTerm) ||
                t.TicketNumber.ToLower().Contains(searchTerm));
        }


        bool isDescending = string.Equals(request.SortOrder, "desc", StringComparison.OrdinalIgnoreCase);
        query = request.SortBy?.ToLower() switch
        {
            "updatedat" => isDescending
                ? query.OrderByDescending(t => t.UpdatedAt)
                : query.OrderBy(t => t.UpdatedAt),

            "priority" => isDescending
                ? query.OrderByDescending(t => t.Priority)
                : query.OrderBy(t => t.Priority),

            _ => isDescending
                ? query.OrderByDescending(t => t.CreatedAt)
                : query.OrderBy(t => t.CreatedAt)
        };

        var totalCount = await query.CountAsync(cancellationToken);

        var page = request.Page < 1 ? 1 : request.Page;
        var pageSize = request.PageSize switch
        {
            < 1 => 10,
            > 100 => 100,
            _ => request.PageSize
        };
        var rawTickets = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new
            {
                t.Id,
                t.TicketNumber,
                t.Title,
                t.Description,
                t.Status,
                t.Priority,
                t.CreatedById,
                t.AssigneeId,
                t.CreatedAt
            })
            .ToListAsync(cancellationToken);

        var assigneeIds = rawTickets
            .Where(t => t.AssigneeId.HasValue)
            .Select(t => t.AssigneeId!.Value);

        var userMap = await _userContract.GetUsersByIdsAsync(assigneeIds, cancellationToken);

        var items = rawTickets.Select(t => new TicketSummaryDto(
            t.Id,
            t.TicketNumber,
            t.Title,
            t.Description,
            t.Status,
            t.Priority,
            t.CreatedById,
            t.AssigneeId,
            t.AssigneeId.HasValue && userMap.TryGetValue(t.AssigneeId.Value, out var user)
                ? user.FullName
                : null,
            t.CreatedAt
        )).ToList();

        return new PagedResult<TicketSummaryDto>(items, page, pageSize, totalCount);
    }
}