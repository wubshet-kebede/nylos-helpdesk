namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.UpdateTicket;

using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Domain;

public sealed record UpdateTicketCommand(
    Guid TicketId,
    Guid currentUserId,
    string Title,
    string Description,
    TicketPriority Priority
) : IRequest;