using MediatR;
using Nylos.Helpdesk.Modules.Comments.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Comments.Application.Queries;

public record GetCommentsByTicketIdQuery(Guid TicketId) : IRequest<IReadOnlyList<CommentDto>>;