using System.Net;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Users.Application.Abstractions;
using Nylos.Helpdesk.Modules.Users.Domain;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Infrastructure.Authentication;

namespace Nylos.Helpdesk.Modules.Users.Application.Commands.RefreshUserToken;

internal sealed class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, bool>
{
    private readonly UsersDbContext _dbContext;
    private readonly IJwtProvider _jwtProvider;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RefreshTokenCommandHandler(
        UsersDbContext dbContext,
        IJwtProvider jwtProvider,
        IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _jwtProvider = jwtProvider;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext is null) return false;

        if (!httpContext.Request.Cookies.TryGetValue("refreshToken", out var rawToken) || string.IsNullOrEmpty(rawToken))
        {
            return false;
        }

        // Decode URL-encoded cookie characters (e.g., %2B -> +, %3D -> =)
        var decodedToken = WebUtility.UrlDecode(rawToken);

        // Try lookup using both decoded and raw string variants
        var storedToken = await _dbContext.RefreshTokens
            .FirstOrDefaultAsync(t => t.Token == decodedToken || t.Token == rawToken, cancellationToken);

        if (storedToken is null || !storedToken.IsActive)
        {
            return false;
        }

        var user = await _dbContext.Users.FindAsync(new object[] { storedToken.UserId }, cancellationToken);
        if (user is null) return false;

        // Token Rotation: Revoke old token
        storedToken.Revoke();

        var newAccessToken = _jwtProvider.GenerateAccessToken(user);
        var newRefreshToken = _jwtProvider.GenerateRefreshToken();

        _dbContext.RefreshTokens.Add(new RefreshToken(
            Guid.NewGuid(),
            user.Id,
            newRefreshToken,
            DateTime.UtcNow.AddDays(7)
        ));

        await _dbContext.SaveChangesAsync(cancellationToken);

        httpContext.Response.AppendAccessTokenCookie(newAccessToken);
        httpContext.Response.AppendRefreshTokenCookie(newRefreshToken);

        return true;
    }
}