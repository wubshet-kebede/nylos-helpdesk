namespace Nylos.Helpdesk.Modules.Comments.Domain;

public class Comment
{
    public Guid Id { get; private set; }
    public Guid TicketId { get; private set; } // Flexible entity link (e.g., TicketId)
    public Guid AuthorId { get; private set; }
    public string Content { get; private set; } = string.Empty;
    public bool IsInternal { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    private Comment() { } // EF Core

    public Comment(Guid id, Guid ticketId, Guid authorId, string content, bool isInternal = false)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Comment content cannot be empty.", nameof(content));

        Id = id;
        TicketId = ticketId;
        AuthorId = authorId;
        Content = content.Trim();
        IsInternal = isInternal;
        CreatedAt = DateTime.UtcNow;
    }

    public void UpdateContent(string newContent)
    {
        if (string.IsNullOrWhiteSpace(newContent))
            throw new ArgumentException("Comment content cannot be empty.", nameof(newContent));

        Content = newContent.Trim();
        UpdatedAt = DateTime.UtcNow;
    }
}