using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

public record TicketSummaryDto(
    Guid Id,
    string TicketNumber,
    string Title,
    TicketStatus Status,
    TicketPriority Priority,
    Guid CreatedById,
    Guid? AssigneeId,
    DateTime CreatedAt
);