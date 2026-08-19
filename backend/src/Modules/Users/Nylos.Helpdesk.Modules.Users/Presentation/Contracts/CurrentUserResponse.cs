using Nylos.Helpdesk.Modules.Users.Domain;

namespace Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

public record CurrentUserDto(
    Guid Id,
    string Email,
    string FullName,
    UserRole UserRole
);