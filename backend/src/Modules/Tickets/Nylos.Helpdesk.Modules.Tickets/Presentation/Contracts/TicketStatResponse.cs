namespace Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

public record TicketStatsResponse(
    int TotalCount,
    int Open,
    int InProgress,
    int Resolved,
    int Closed
);