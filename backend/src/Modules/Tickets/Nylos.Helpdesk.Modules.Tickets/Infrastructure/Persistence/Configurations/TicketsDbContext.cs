using Microsoft.EntityFrameworkCore;
namespace Nylos.Helpdesk.Modules.Tickets.Infrastructure;
public class TicketsDbContext : DbContext
{
    public TicketsDbContext(DbContextOptions<TicketsDbContext> options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // locks all tables created by this Db context to the tickets schema 
        modelBuilder.HasDefaultSchema("tickets");
    }
}