using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Application.Abstractions;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Tickets.Infrastructure.Services;

public sealed class TicketNumberGenerator : ITicketNumberGenerator
{
    private readonly TicketsDbContext _dbContext;

    public TicketNumberGenerator(TicketsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<string> GenerateAsync(CancellationToken cancellationToken = default)
    {
        var year = DateTime.UtcNow.Year;
        var sequenceName = $"TicketNumberSequence_{year}";


        await _dbContext.Database.ExecuteSqlRawAsync(
            $"""CREATE SEQUENCE IF NOT EXISTS tickets."{sequenceName}" START WITH 1 INCREMENT BY 1;""",
            cancellationToken);


        await _dbContext.Database.ExecuteSqlRawAsync($"""
            SELECT setval(
                'tickets."{sequenceName}"', 
                COALESCE((SELECT MAX(CAST(SUBSTRING("TicketNumber" FROM '[0-9]+$') AS INTEGER)) FROM tickets."Tickets" WHERE "TicketNumber" LIKE 'TK-{year}-%'), 0)
            );
        """, cancellationToken);


        var sequenceNumber = await _dbContext.Database
            .SqlQueryRaw<long>($"""SELECT nextval('tickets."{sequenceName}"') AS "Value" """)
            .SingleAsync(cancellationToken);

        return $"TK-{year}-{sequenceNumber:D6}";
    }
}