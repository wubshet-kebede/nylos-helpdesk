using Microsoft.Extensions.DependencyInjection;
using Nylos.Helpdesk.Shared.Infrastructure.Exceptions;
using FluentValidation;
using MediatR;
using Nylos.Helpdesk.Shared.Infrastructure.Behaviors;


namespace Nylos.Helpdesk.Shared.Infrastructure;

public static class SharedInfrastructure
{
    public static IServiceCollection AddSharedInfrastructure(this IServiceCollection services)
    {
        services.AddProblemDetails();
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationPipelineBehavior<,>));
        return services;
    }
}