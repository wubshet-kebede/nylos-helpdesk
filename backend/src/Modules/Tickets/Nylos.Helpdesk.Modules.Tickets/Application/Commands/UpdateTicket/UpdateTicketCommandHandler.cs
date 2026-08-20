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

        ticket.UpdateDetails(request.Title, request.Description, request.Priority);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}