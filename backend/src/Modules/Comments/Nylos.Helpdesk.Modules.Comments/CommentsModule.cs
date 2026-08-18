using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nylos.Helpdesk.Modules.Comments.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Comments;

public static class CommentsModule
{
    public static IServiceCollection AddCommentsModule(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Database");

        services.AddDbContext<CommentsDbContext>(options =>
            options.UseNpgsql(
                connectionString,
                npgsql => npgsql.MigrationsHistoryTable(
                    "__EFMigrationsHistory",
                    "comments")));

        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(
                typeof(CommentsModule).Assembly));

        return services;
    }
}