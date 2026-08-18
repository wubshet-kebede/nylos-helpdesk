using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;
namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketById;

public record GetTicketByIdQuery(Guid TicketId) : IRequest<TicketDetailsDto>;