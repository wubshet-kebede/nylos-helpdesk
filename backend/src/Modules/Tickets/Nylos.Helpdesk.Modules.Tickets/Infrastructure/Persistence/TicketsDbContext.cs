using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence;

public class TicketsDbContext : DbContext
{
    public TicketsDbContext(DbContextOptions<TicketsDbContext> options) : base(options)
    {
    }

    public DbSet<Ticket> Tickets => Set<Ticket>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Locks all tables created by this DbContext to the "tickets" schema
        modelBuilder.HasDefaultSchema("tickets");

        // Applies TicketConfiguration and all other IEntityTypeConfiguration classes in this assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TicketsDbContext).Assembly);
    }
}