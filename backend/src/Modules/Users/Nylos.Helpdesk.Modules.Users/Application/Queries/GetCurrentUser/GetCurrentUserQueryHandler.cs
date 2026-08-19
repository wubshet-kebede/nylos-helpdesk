using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;
using Nylos.Helpdesk.Modules.Users.Presentation.Contracts;
namespace Nylos.Helpdesk.Modules.Users.Application.Queries.GetCurrentUser;

internal sealed class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, CurrentUserDto>
{
    private readonly UsersDbContext _dbContext;

    public GetCurrentUserQueryHandler(UsersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<CurrentUserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user is null)
        {
            throw new NotFoundException($"User with ID {request.UserId} was not found.");
        }

        return new CurrentUserDto(
            user.Id,
            user.Email,
            user.FullName,
            user.UserRole
        );
    }
}