using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Users.Application.Abstractions;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Services;

namespace Nylos.Helpdesk.Modules.Users;

public static class UsersModule
{
    public static IServiceCollection AddUsersModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Database");

        services.AddDbContext<UsersDbContext>(options =>
            options.UseNpgsql(connectionString, npgsql =>
                npgsql.MigrationsHistoryTable("__EFMigrationsHistory", "users")));
        services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();
        services.AddScoped<IJwtProvider, JwtProvider>();
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(UsersModule).Assembly));

        return services;
    }
}