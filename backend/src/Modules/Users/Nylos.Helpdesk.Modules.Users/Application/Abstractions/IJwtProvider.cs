using Nylos.Helpdesk.Modules.Users.Domain;

namespace Nylos.Helpdesk.Modules.Users.Application.Abstractions;

public interface IJwtProvider
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
}