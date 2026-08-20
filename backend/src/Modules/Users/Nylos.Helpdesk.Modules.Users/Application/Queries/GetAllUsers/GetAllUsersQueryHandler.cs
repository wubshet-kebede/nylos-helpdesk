using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Users.Application.Queries.GetAllUsers;



internal sealed class GetAllUsersQueryHandler
    : IRequestHandler<GetAllUsersQuery, IReadOnlyList<UserResponse>>
{
    private readonly UsersDbContext _dbContext;

    public GetAllUsersQueryHandler(UsersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        return await _dbContext.Users
            .AsNoTracking()
            .Select(u => new UserResponse(
                u.Id,
                u.FullName,
                u.Email
            ))
            .ToListAsync(cancellationToken);
    }
}