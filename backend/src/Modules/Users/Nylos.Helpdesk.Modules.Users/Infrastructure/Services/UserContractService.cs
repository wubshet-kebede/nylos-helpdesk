using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Users.Contracts;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Users.Infrastructure.Services;

public class UserContractService : IUserModuleContract
{
    private readonly UsersDbContext _dbContext;

    public UserContractService(UsersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid userId, CancellationToken ct = default)
    {
        return await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == userId)
            .Select(u => new UserDto(
                u.Id,
                u.FullName,
                u.Email
            ))
            .FirstOrDefaultAsync(ct);
    }

    public async Task<IReadOnlyDictionary<Guid, UserDto>> GetUsersByIdsAsync(
        IEnumerable<Guid> userIds,
        CancellationToken ct = default)
    {
        var distinctIds = userIds.Distinct().ToList();

        if (!distinctIds.Any())
        {
            return new Dictionary<Guid, UserDto>();
        }

        var users = await _dbContext.Users
            .AsNoTracking()
            .Where(u => distinctIds.Contains(u.Id))
            .Select(u => new UserDto(
                u.Id,
                u.FullName,
                u.Email
            ))
            .ToDictionaryAsync(u => u.Id, ct);

        return users;
    }
}