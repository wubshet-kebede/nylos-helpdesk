using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;


namespace Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketById;

internal sealed class GetTicketByIdQueryHandler : IRequestHandler<GetTicketByIdQuery, TicketDetailsDto>
{
    private readonly TicketsDbContext _dbContext;

    public GetTicketByIdQueryHandler(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TicketDetailsDto> Handle(GetTicketByIdQuery request, CancellationToken cancellationToken)
    {
        //EF Core retrieves the ticket and starts tracking it 
        //  but here no tracking wedon't want it man 
        // so we use the AsNoTracking for read performance
        var ticket = await _dbContext.Tickets
            .AsNoTracking()
            .Where(t => t.Id == request.TicketId)
            .Select(t => new TicketDetailsDto(
                t.Id,
                t.TicketNumber,
                t.Title,
                t.Description,
                t.Status,
                t.Priority,
                t.CreatedById,
                t.AssigneeId,
                t.CreatedAt,
                t.UpdatedAt
            ))
            .FirstOrDefaultAsync(cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException($"Ticket with ID {request.TicketId} was not found.");
        }

        return ticket;
    }
}