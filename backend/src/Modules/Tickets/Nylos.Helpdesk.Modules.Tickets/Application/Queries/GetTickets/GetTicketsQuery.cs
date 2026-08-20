using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Domain;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;
namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTickets;

public record GetTicketsQuery(
    TicketStatus? Status = null,
    TicketPriority? Priority = null,
    Guid? AssigneeId = null,
    Guid? CreatedById = null,
    string? Search = null,
    int Page = 1,
    int PageSize = 10
) : IRequest<PagedResult<TicketSummaryDto>>;