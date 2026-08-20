using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Contracts;
using Nylos.Helpdesk.Modules.Tickets.Domain;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Tickets.Infrastructure.Services;

internal sealed class TicketContractService : ITicketContractService
{
    private readonly TicketsDbContext _dbContext;

    public TicketContractService(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TicketStatusContractDto?> GetTicketStatusAsync(Guid ticketId, CancellationToken cancellationToken = default)
    {
        var ticket = await _dbContext.Tickets
            .AsNoTracking()
            .Where(t => t.Id == ticketId)
            .Select(t => new
            {
                t.Id,
                t.Status
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (ticket is null) return null;

        return new TicketStatusContractDto(
            ticket.Id,
            ticket.Status.ToString(),
            ticket.Status == TicketStatus.Closed
        );
    }
}