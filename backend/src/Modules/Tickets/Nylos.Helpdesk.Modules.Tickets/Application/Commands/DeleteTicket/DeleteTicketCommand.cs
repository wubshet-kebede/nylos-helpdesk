using MediatR;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.DeleteTicket;

public record DeleteTicketCommand(Guid TicketId, Guid currentUserId) : IRequest;