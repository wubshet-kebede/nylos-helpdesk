using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.AssignTicket;

internal sealed class AssignTicketCommandHandler : IRequestHandler<AssignTicketCommand>
{
    private readonly TicketsDbContext _dbContext;

    public AssignTicketCommandHandler(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(AssignTicketCommand request, CancellationToken cancellationToken)
    {
        var ticket = await _dbContext.Tickets
            .FirstOrDefaultAsync(t => t.Id == request.TicketId, cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException($"Ticket with ID {request.TicketId} was not found.");
        }

        // Domain method assigns agent and automatically sets Status to InProgress
        ticket.AssignTo(request.AssigneeId);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}