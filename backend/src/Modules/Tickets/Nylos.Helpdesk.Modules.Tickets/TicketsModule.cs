using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nylos.Helpdesk.Modules.Tickets.Application.Abstractions;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Tickets.Infrastructure.Services;

namespace Nylos.Helpdesk.Modules.Tickets;

public static class TicketsModule
{
    public static IServiceCollection AddTicketsModule(
        this IServiceCollection services, 
        IConfiguration configuration)
    {  
        var connectionString = configuration.GetConnectionString("Database");
        services.AddDbContext<TicketsDbContext>(options => options.UseNpgsql(connectionString, npgsql => npgsql.MigrationsHistoryTable("__EFMigrationsHistory", "tickets")));
        services.AddScoped<ITicketNumberGenerator, TicketNumberGenerator>();
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(TicketsModule).Assembly));
        return services;
    }
}