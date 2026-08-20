using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.AssignTicket;

public sealed class AssignTicketCommandHandler : IRequestHandler<AssignTicketCommand>
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
            throw new KeyNotFoundException($"Ticket with ID '{request.TicketId}' was not found.");
        }

        if (ticket.CreatedById != request.CurrentUserId)
        {
            throw new UnauthorizedAccessException("Only the ticket creator can assign this ticket.");
        }

        ticket.AssignToPeer(request.AssigneeId);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}