using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nylos.Helpdesk.Modules.Users.Domain;

namespace Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence.Configurations;

internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users", "users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Email)
            .HasMaxLength(255)
            .IsRequired();

        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.Property(u => u.FullName)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(u => u.PasswordHash)
            .IsRequired();

        builder.Property(u => u.UserRole)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(u => u.CreatedAt)
            .IsRequired()
            .HasColumnName("CreatedAt");

        builder.HasIndex(u => u.Email)
            .IsUnique();    
    }
}