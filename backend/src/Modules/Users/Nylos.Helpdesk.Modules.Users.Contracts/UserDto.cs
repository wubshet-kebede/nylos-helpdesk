namespace Nylos.Helpdesk.Modules.Users.Contracts;

public record UserDto(
    Guid Id,
    string FullName,
    string Email
);