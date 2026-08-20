using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;
using Nylos.Helpdesk.Modules.Tickets.Domain;
namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.UpdateTicket;

internal sealed class UpdateTicketStatusCommandHandler : IRequestHandler<UpdateTicketStatusCommand>
{
    private readonly TicketsDbContext _dbContext;

    public UpdateTicketStatusCommandHandler(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(UpdateTicketStatusCommand request, CancellationToken cancellationToken)
    {
        var ticket = await _dbContext.Tickets
            .FirstOrDefaultAsync(t => t.Id == request.TicketId, cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException($"Ticket with ID {request.TicketId} was not found.");
        }
        // Delegate to Resolve if moving to Resolved, otherwise use standard MoveToStatus
        Console.WriteLine($"Requested status: {request.NewStatus}");
        Console.WriteLine($"Requested status value: {(int)request.NewStatus}");
        if (request.NewStatus == TicketStatus.Resolved)
        {
            ticket.Resolve(request.currentUserId);
        }
        else
        {
            ticket.MoveToStatus(request.NewStatus);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}