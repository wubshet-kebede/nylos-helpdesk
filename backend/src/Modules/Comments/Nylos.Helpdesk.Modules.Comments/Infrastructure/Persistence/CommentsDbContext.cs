using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Comments.Domain;

namespace Nylos.Helpdesk.Modules.Comments.Infrastructure.Persistence;

public class CommentsDbContext : DbContext
{
    public CommentsDbContext(DbContextOptions<CommentsDbContext> options) : base(options) { }

    public DbSet<Comment> Comments => Set<Comment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("comments");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CommentsDbContext).Assembly);


    }
}