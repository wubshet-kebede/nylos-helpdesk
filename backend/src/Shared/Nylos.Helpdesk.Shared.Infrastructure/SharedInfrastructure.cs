using Microsoft.Extensions.DependencyInjection;
using Nylos.Helpdesk.Shared.Infrastructure.Exceptions;

namespace Nylos.Helpdesk.Shared.Infrastructure;

public static class SharedInfrastructure
{
    public static IServiceCollection AddSharedInfrastructure(this IServiceCollection services)
    {
        services.AddProblemDetails();
        services.AddExceptionHandler<GlobalExceptionHandler>();

        return services;
    }
}