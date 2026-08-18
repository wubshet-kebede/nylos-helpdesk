using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

public record UpdateTicketStatusRequest(TicketStatus NewStatus);