using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Users;

public static class UsersModule
{
    public static IServiceCollection AddUsersModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Database");

        services.AddDbContext<UsersDbContext>(options =>
            options.UseNpgsql(connectionString, npgsql =>
                npgsql.MigrationsHistoryTable("__EFMigrationsHistory", "users")));

        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(UsersModule).Assembly));

        return services;
    }
}