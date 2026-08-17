using MediatR;
namespace Nylos.Helpdesk.Modules.Users.Application.Commands.RegisterUser;

// describing what i want to do 
public record RegisterUserCommand(
    string Email,
    string FullName,
    string Password
) : IRequest<Guid>;

