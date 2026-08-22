using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;

public static class TicketsDbInitializer
{

    private static readonly Guid AdminUserId = Guid.Parse("11111111-1111-1111-1111-111111111111");
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();

        var dbContext = scope.ServiceProvider
            .GetRequiredService<TicketsDbContext>();

        var logger = scope.ServiceProvider
            .GetRequiredService<ILogger<TicketsDbContext>>();

        try
        {
            if ((await dbContext.Database.GetPendingMigrationsAsync()).Any())
            {
                await dbContext.Database.MigrateAsync();
            }

            var hasTickets = await dbContext.Tickets.AnyAsync();

            if (!hasTickets)
            {
                var ticket1 = new Ticket(
                    Guid.NewGuid(),
                    "TK-2026-000001",
                    "Database connection pool exhaustion during peak traffic",
                    "Investigate high latency and connection spikes during morning load tests.",
                    TicketPriority.High,
                    AdminUserId
                );

                var ticket2 = new Ticket(
                    Guid.NewGuid(),
                    "TK-2026-000002",
                    "Fix responsive layout truncation on mobile sidebar",
                    "Ensure drawer navigation text truncates gracefully without breaking layout bounds.",
                    TicketPriority.Medium,
                    AdminUserId
                );

                var ticket3 = new Ticket(
                    Guid.NewGuid(),
                    "TK-2026-000003",
                    "Configure token expiration duration in production app settings",
                    "Update JWT refresh token expiration window to align with standard security policies.",
                    TicketPriority.Low,
                    AdminUserId
                );

                dbContext.Tickets.AddRange(ticket1, ticket2, ticket3);
                await dbContext.SaveChangesAsync();

                logger.LogInformation("Successfully seeded sample tickets under Admin user.");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while seeding the Tickets database.");
            throw;
        }
    }
}