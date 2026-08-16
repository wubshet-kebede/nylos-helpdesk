using MediatR;
using Nylos.Helpdesk.Modules.Tickets.Application.Abstractions;
using Nylos.Helpdesk.Modules.Tickets.Domain;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.CreateTicket;

public sealed class CreateTicketCommandHandler : IRequestHandler<CreateTicketCommand, Guid>
{
    private readonly TicketsDbContext _dbContext;
    private readonly ITicketNumberGenerator _ticketNumberGenerator;

    public CreateTicketCommandHandler(
        TicketsDbContext dbContext,
        ITicketNumberGenerator ticketNumberGenerator)
    {
        _dbContext = dbContext;
        _ticketNumberGenerator = ticketNumberGenerator;
    }

    public async Task<Guid> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
    {
        //  Generate the unique, sequential ticket number
        var ticketNumber = await _ticketNumberGenerator.GenerateAsync(cancellationToken);

        //  Instantiate the domain entity (business invariants validated inside constructor)
        var ticket = new Ticket(
            Guid.NewGuid(),
            ticketNumber,
            request.Title,
            request.Description,
            request.Priority,
            request.CreatedById
        );

        // 3. Persist entity to database
        _dbContext.Tickets.Add(ticket);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return ticket.Id;
    }
}