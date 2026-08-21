namespace Nylos.Helpdesk.Modules.Users.Contracts;

public interface IUserModuleContract
{
    Task<UserDto?> GetUserByIdAsync(
        Guid userId,
        CancellationToken ct = default
    );

    Task<IReadOnlyDictionary<Guid, UserDto>> GetUsersByIdsAsync(
        IEnumerable<Guid> userIds,
        CancellationToken ct = default
    );
}