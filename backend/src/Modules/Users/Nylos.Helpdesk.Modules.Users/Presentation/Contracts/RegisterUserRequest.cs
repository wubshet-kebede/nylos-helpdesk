namespace Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

public sealed record RegisterUserRequest(
    string Email,
    string FullName,
    string Password
);