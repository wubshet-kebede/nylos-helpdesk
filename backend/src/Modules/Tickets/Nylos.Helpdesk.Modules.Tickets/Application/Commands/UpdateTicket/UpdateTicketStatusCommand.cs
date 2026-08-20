using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.UpdateTicket;

public record UpdateTicketStatusCommand(
    Guid TicketId,
    Guid currentUserId,
    TicketStatus NewStatus
) : IRequest;