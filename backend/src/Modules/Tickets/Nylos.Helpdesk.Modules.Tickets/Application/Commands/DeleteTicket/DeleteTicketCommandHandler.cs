using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.DeleteTicket;

internal sealed class DeleteTicketCommandHandler : IRequestHandler<DeleteTicketCommand>
{
    private readonly TicketsDbContext _dbContext;

    public DeleteTicketCommandHandler(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(DeleteTicketCommand request, CancellationToken cancellationToken)
    {
        var ticket = await _dbContext.Tickets
            .FirstOrDefaultAsync(t => t.Id == request.TicketId, cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException($"Ticket with ID {request.TicketId} was not found.");
        }

        _dbContext.Tickets.Remove(ticket);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}