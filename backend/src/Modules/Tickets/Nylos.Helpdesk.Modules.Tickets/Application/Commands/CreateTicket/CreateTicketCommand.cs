using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.CreateTicket;

public sealed record CreateTicketCommand(
    string Title,
    string Description,
    TicketPriority Priority,
    Guid CreatedById
) : IRequest<Guid>;