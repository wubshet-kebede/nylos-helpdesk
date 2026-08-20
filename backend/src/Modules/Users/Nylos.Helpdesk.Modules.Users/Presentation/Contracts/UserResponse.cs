namespace Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

public sealed record UserResponse(
    Guid Id,
    string Name,
    string Email
);