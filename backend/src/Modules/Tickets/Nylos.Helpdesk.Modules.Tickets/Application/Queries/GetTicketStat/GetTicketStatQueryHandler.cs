using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Domain;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketStat;

internal sealed class GetTicketStatsQueryHandler
    : IRequestHandler<GetTicketStatQuery, TicketStatsResponse>
{
    private readonly TicketsDbContext _dbContext;

    public GetTicketStatsQueryHandler(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TicketStatsResponse> Handle(
        GetTicketStatQuery request,
        CancellationToken cancellationToken)
    {
        var statusCounts = await _dbContext.Tickets
            .AsNoTracking()
            .GroupBy(t => t.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToDictionaryAsync(g => g.Status, g => g.Count, cancellationToken);

        int open = statusCounts.GetValueOrDefault(TicketStatus.Open, 0);
        int inProgress = statusCounts.GetValueOrDefault(TicketStatus.InProgress, 0);
        int resolved = statusCounts.GetValueOrDefault(TicketStatus.Resolved, 0);
        int closed = statusCounts.GetValueOrDefault(TicketStatus.Closed, 0);

        int totalCount = open + inProgress + resolved + closed;

        return new TicketStatsResponse(totalCount, open, inProgress, resolved, closed);
    }
}