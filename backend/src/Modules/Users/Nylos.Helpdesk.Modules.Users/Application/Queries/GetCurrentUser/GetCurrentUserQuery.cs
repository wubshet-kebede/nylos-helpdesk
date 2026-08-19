using MediatR;
using Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Users.Application.Queries.GetCurrentUser;

public record GetCurrentUserQuery(Guid UserId) : IRequest<CurrentUserDto>;

