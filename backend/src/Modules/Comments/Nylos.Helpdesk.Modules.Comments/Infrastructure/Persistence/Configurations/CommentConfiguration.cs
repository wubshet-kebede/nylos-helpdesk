using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nylos.Helpdesk.Modules.Comments.Domain;

namespace Nylos.Helpdesk.Modules.Comments.Infrastructure.Persistence.Configurations;

internal sealed class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.ToTable("Comments", "comments");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Content)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(c => c.AuthorId)
            .IsRequired();

        builder.Property(c => c.TicketId)
            .IsRequired();

        builder.Property(c => c.IsInternal)
            .IsRequired();

        builder.Property(c => c.CreatedAt)
            .IsRequired();

        builder.HasIndex(c => c.TicketId);
        builder.HasIndex(c => c.AuthorId);
    }
}