using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Users.Application.Abstractions;
using Nylos.Helpdesk.Modules.Users.Domain;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;

namespace Nylos.Helpdesk.Modules.Users.Application.Commands.RegisterUser;

internal sealed class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Guid>
{
    // i am injected the db context and the passwordhaser 
    // this dependency injection through the constructor.
    /// <summary>
    /// readonly means:This field can be assigned during construction, but you can't replace it later.
    /// </summary>
    private readonly UsersDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;

    public RegisterUserCommandHandler(UsersDbContext dbContext, IPasswordHasher passwordHasher)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
    }

    public async Task<Guid> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.ToLowerInvariant().Trim();

        var emailExists = await _dbContext.Users
            .AnyAsync(u => u.Email == normalizedEmail, cancellationToken);

        if (emailExists)
        {
            throw new ConflictException("A user with this email address already exists.");
        }

        var passwordHash = _passwordHasher.HashPassword(request.Password);

        // HARDCODED SAFE DEFAULT ROLE:
        // Regular users register as "Customer". Admins/Agents are provisioned separately!
        const UserRole defaultRole = UserRole.Customer;
        var user = new User(
            Guid.NewGuid(),
            normalizedEmail,
            request.FullName,
            passwordHash,
            defaultRole
        );

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return user.Id;
    }
}