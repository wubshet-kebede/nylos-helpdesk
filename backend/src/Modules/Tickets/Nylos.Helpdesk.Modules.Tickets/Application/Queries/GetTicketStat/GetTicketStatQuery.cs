using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketStat;

public record GetTicketStatQuery : IRequest<TicketStatsResponse>;