using MediatR;

namespace Nylos.Helpdesk.Modules.Comments.Application.Commands.CreateComment;

public record CreateCommentCommand(
    Guid TicketId,
    Guid AuthorId,
    string Content,
    bool IsInternal = false
) : IRequest<Guid>;