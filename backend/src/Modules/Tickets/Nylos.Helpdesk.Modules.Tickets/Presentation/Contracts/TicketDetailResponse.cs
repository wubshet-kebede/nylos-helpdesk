using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

public record TicketDetailsDto(
    Guid Id,
    string TicketNumber,
    string Title,
    string Description,
    string AssigneeName,
    TicketStatus Status,
    TicketPriority Priority,
    Guid CustomerId,
    Guid? AssigneeId,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);