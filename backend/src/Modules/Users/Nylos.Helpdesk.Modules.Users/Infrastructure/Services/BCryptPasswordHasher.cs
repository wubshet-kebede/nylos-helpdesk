using Nylos.Helpdesk.Modules.Users.Application.Abstractions;

namespace Nylos.Helpdesk.Modules.Users.Infrastructure.Services;

internal sealed class BCryptPasswordHasher : IPasswordHasher
{
    public string HashPassword(string password) =>
        BCrypt.Net.BCrypt.HashPassword(password);

    public bool VerifyPassword(string password, string passwordHash) =>
        BCrypt.Net.BCrypt.Verify(password, passwordHash);
}