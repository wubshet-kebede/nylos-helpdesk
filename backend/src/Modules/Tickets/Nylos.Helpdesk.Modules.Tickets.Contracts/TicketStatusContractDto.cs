namespace Nylos.Helpdesk.Modules.Tickets.Contracts;

public record TicketStatusContractDto(
    Guid TicketId,
    string Status,
    bool IsClosed
);