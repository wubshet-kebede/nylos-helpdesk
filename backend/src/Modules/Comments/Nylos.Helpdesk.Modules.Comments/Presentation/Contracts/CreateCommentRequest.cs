namespace Nylos.Helpdesk.Modules.Comments.Presentation.Contracts;

public record CreateCommentRequest(
    Guid TicketId,
    string Content,
    bool IsInternal = false
);