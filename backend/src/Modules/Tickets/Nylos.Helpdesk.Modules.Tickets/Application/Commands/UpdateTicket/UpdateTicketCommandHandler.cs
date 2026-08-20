using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.UpdateTicket;

public sealed class UpdateTicketCommandHandler : IRequestHandler<UpdateTicketCommand>
{
    private readonly TicketsDbContext _dbContext;

    public UpdateTicketCommandHandler(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(UpdateTicketCommand request, CancellationToken cancellationToken)
    {
        var ticket = await _dbContext.Tickets
            .FirstOrDefaultAsync(t => t.Id == request.TicketId, cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException($"Ticket with ID '{request.TicketId}' was not found.");
        }
        if (ticket.CreatedById != request.currentUserId)
        {
            // Throw an exception that gets mapped to HTTP 403 Forbidden
            throw new UnauthorizedAccessException("You are not authorized to edit this ticket.");
        }
        ticket.UpdateDetails(request.Title, request.Description, request.Priority);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}