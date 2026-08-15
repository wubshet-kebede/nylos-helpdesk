using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Nylos.Helpdesk.Modules.Tickets;

public static class TicketsModule
{
    public static IServiceCollection AddTicketsModule(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        return services;
    }
}