namespace Nylos.Helpdesk.Modules.Comments.Presentation.Contracts;

public record CommentDto(
    Guid Id,
    Guid TicketId,
    Guid AuthorId,
    string Content,
    bool IsInternal,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    bool IsEdited
);
