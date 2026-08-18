using MediatR;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.AssignTicket;

public record AssignTicketCommand(
    Guid TicketId,
    Guid AssigneeId
) : IRequest;