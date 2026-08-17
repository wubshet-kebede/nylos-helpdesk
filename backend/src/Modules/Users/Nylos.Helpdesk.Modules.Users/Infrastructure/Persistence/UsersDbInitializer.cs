using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Nylos.Helpdesk.Modules.Users.Application.Abstractions;
using Nylos.Helpdesk.Modules.Users.Domain;

namespace Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;

public static class UsersDbInitializer
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();

        var dbContext = scope.ServiceProvider
            .GetRequiredService<UsersDbContext>();

        var passwordHasher = scope.ServiceProvider
            .GetRequiredService<IPasswordHasher>();

        var logger = scope.ServiceProvider
            .GetRequiredService<ILogger<UsersDbContext>>();

        try
        {
            // Apply pending migrations
            if ((await dbContext.Database.GetPendingMigrationsAsync()).Any())
            {
                await dbContext.Database.MigrateAsync();
            }

            // Check whether an Admin already exists
            var hasAdmin = await dbContext.Users
                .AnyAsync(u => u.UserRole == UserRole.Admin);

            if (!hasAdmin)
            {
                var adminUser = new User(
                    Guid.NewGuid(),
                    "admin@nylos.com",
                    "Wubshet Ayellew",
                    passwordHasher.HashPassword("Admin@123456"),
                    UserRole.Admin
                );

                dbContext.Users.Add(adminUser);

                await dbContext.SaveChangesAsync();

                logger.LogInformation(
                    "Successfully seeded default Admin user ({Email}).",
                    adminUser.Email);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(
                ex,
                "An error occurred while seeding the Users database.");

            throw;
        }
    }
}