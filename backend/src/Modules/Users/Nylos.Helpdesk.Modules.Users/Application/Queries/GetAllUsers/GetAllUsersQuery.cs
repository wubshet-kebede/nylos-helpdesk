using MediatR;
using Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Users.Application.Queries.GetAllUsers;

public record GetAllUsersQuery : IRequest<IReadOnlyList<UserResponse>>;