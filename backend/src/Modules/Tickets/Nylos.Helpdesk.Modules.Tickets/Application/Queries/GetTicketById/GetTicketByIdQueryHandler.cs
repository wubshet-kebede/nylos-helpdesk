using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;
using Nylos.Helpdesk.Modules.Users.Contracts;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketById;

internal sealed class GetTicketByIdQueryHandler : IRequestHandler<GetTicketByIdQuery, TicketDetailsDto>
{
    private readonly TicketsDbContext _dbContext;
    private readonly IUserModuleContract _userContract;

    public GetTicketByIdQueryHandler(TicketsDbContext dbContext, IUserModuleContract userContract)
    {
        _dbContext = dbContext;
        _userContract = userContract;
    }

    public async Task<TicketDetailsDto> Handle(GetTicketByIdQuery request, CancellationToken cancellationToken)
    {
        var ticket = await _dbContext.Tickets
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == request.TicketId, cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException($"Ticket with ID {request.TicketId} was not found.");
        }

        string assigneeName = "Unassigned";

        if (ticket.AssigneeId.HasValue)
        {
            var userMap = await _userContract.GetUsersByIdsAsync(
                new[] { ticket.AssigneeId.Value },
                cancellationToken
            );

            if (userMap.TryGetValue(ticket.AssigneeId.Value, out var user))
            {
                assigneeName = user.FullName;
            }
        }

        return new TicketDetailsDto(
            ticket.Id,
            ticket.TicketNumber,
            ticket.Title,
            ticket.Description,
            assigneeName,
            ticket.Status,
            ticket.Priority,
            ticket.CreatedById,
            ticket.AssigneeId,
            ticket.CreatedAt,
            ticket.UpdatedAt
        );
    }
}