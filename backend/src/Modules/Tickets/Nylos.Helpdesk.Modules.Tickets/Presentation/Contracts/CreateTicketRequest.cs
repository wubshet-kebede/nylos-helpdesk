using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

public sealed record CreateTicketRequest(
    string Title,
    string Description,
    TicketPriority Priority,
    Guid CreatedById
);