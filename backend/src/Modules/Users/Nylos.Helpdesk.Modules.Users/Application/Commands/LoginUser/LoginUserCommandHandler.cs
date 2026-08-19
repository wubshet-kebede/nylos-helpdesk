using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Users.Application.Abstractions;
using Nylos.Helpdesk.Modules.Users.Domain;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Infrastructure.Authentication;

namespace Nylos.Helpdesk.Modules.Users.Application.Commands.LoginUser;

internal sealed class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, bool>
{
    // here is the DB injection 
    private readonly UsersDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LoginUserCommandHandler(
        UsersDbContext dbContext,
        IPasswordHasher passwordHasher,
        IJwtProvider jwtProvider,
        IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.ToLowerInvariant().Trim();

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == normalizedEmail, cancellationToken);

        if (user is null || !_passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
        {
            // Throwing this triggers GlobalExceptionHandler -> returns ProblemDetails with detail message
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var accessToken = _jwtProvider.GenerateAccessToken(user);
        var rawRefreshToken = _jwtProvider.GenerateRefreshToken();

        var refreshTokenEntity = new RefreshToken(
            Guid.NewGuid(),
            user.Id,
            rawRefreshToken,
            DateTime.UtcNow.AddDays(7)
        );

        _dbContext.RefreshTokens.Add(refreshTokenEntity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var response = _httpContextAccessor.HttpContext?.Response;
        if (response is not null)
        {
            response.AppendAccessTokenCookie(accessToken);
            response.AppendRefreshTokenCookie(rawRefreshToken);
        }

        return true;
    }
}