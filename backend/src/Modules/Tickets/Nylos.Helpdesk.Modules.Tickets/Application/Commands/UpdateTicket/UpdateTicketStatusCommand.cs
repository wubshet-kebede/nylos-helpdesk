using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.UpdateTicket;

public record UpdateTicketStatusCommand(
    Guid TicketId,
    TicketStatus NewStatus
) : IRequest;