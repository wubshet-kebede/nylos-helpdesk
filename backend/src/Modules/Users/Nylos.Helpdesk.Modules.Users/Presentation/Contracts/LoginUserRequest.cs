namespace Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

public sealed record LoginUserRequest(
    string Email,
    string Password
);