namespace Nylos.Helpdesk.Modules.Users.Domain;

public class User
{
    public Guid Id { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string FullName { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public UserRole UserRole { get; private set; } = UserRole.Customer;
    public DateTime CreatedAt { get; private set; }

    private User() { } // EF Core constructor

    public User(Guid id, string email, string fullName, string passwordHash, UserRole userRole)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email is required.", nameof(email));
        if (string.IsNullOrWhiteSpace(fullName))
            throw new ArgumentException("Full name is required.", nameof(fullName));
        if (string.IsNullOrWhiteSpace(passwordHash))
            throw new ArgumentException("Password  is required.", nameof(passwordHash));
        if (!Enum.IsDefined(userRole))
            throw new ArgumentException(
                "Invalid user role.",
                nameof(userRole));

        Id = id;
        Email = email.ToLowerInvariant().Trim();
        FullName = fullName.Trim();
        PasswordHash = passwordHash;
        UserRole = userRole;
        CreatedAt = DateTime.UtcNow;
    }
}
