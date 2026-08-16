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
        var sequenceName = $"\"TicketNumberSequence_{year}\"";

        //  Ensure a dedicated sequence exists for the current year
        await _dbContext.Database.ExecuteSqlRawAsync(
            $"""CREATE SEQUENCE IF NOT EXISTS tickets.{sequenceName} START WITH 1 INCREMENT BY 1;""",
            cancellationToken);

        //  Fetch the next value for this year's sequence
        var sequenceNumber = await _dbContext.Database
            .SqlQueryRaw<long>($"""SELECT nextval('tickets.{sequenceName}') AS "Value" """)
            .SingleAsync(cancellationToken);

        // Format as TK-2026-000001
        return $"TK-{year}-{sequenceNumber:D6}";
    }
}