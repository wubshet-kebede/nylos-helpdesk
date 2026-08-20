namespace Nylos.Helpdesk.Modules.Tickets.Contracts;

public interface ITicketContractService
{
    Task<TicketStatusContractDto?> GetTicketStatusAsync(Guid ticketId, CancellationToken cancellationToken = default);
}