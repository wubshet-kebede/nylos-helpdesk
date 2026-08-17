using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nylos.Helpdesk.Modules.Users.Domain;

namespace Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence.Configurations;

internal sealed class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.ToTable("RefreshTokens", "users");

        builder.HasKey(r => r.Id);

        builder.Property(r => r.Token)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasIndex(r => r.Token);

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}