using MediatR;

namespace Nylos.Helpdesk.Modules.Users.Application.Commands.LoginUser;

public record LoginUserCommand(
    string Email,
    string Password
    ) : IRequest<bool>;