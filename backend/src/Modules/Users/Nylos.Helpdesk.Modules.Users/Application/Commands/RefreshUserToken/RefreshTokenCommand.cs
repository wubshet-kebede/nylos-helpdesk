using MediatR;

namespace Nylos.Helpdesk.Modules.Users.Application.Commands.RefreshUserToken;

public record RefreshTokenCommand() : IRequest<bool>;