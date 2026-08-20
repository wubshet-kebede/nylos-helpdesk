using MediatR;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.AssignTicket;

public sealed record AssignTicketCommand(
    Guid TicketId,
    Guid AssigneeId,
    Guid CurrentUserId
) : IRequest;