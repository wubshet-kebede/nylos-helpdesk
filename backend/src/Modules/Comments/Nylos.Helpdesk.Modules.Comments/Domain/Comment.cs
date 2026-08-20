namespace Nylos.Helpdesk.Modules.Comments.Domain;

public class Comment
{
    public Guid Id { get; private set; }
    public Guid TicketId { get; private set; }
    public Guid AuthorId { get; private set; }
    public string Content { get; private set; } = string.Empty;
    public bool IsInternal { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    // Helper property for UI rendering
    public bool IsEdited => UpdatedAt.HasValue;

    private Comment() { }

    public Comment(Guid id, Guid ticketId, Guid authorId, string content, bool isInternal = false)
    {
        if (id == Guid.Empty)
            throw new ArgumentException("Comment ID cannot be empty.", nameof(id));

        if (ticketId == Guid.Empty)
            throw new ArgumentException("Ticket ID cannot be empty.", nameof(ticketId));

        if (authorId == Guid.Empty)
            throw new ArgumentException("Author ID cannot be empty.", nameof(authorId));

        ValidateContent(content);

        Id = id;
        TicketId = ticketId;
        AuthorId = authorId;
        Content = content.Trim();
        IsInternal = isInternal;
        CreatedAt = DateTime.UtcNow;
    }

    public void UpdateContent(string newContent)
    {
        ValidateContent(newContent);

        Content = newContent.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    private static void ValidateContent(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Comment content cannot be empty.", nameof(content));

        if (content.Length > 10000)
            throw new ArgumentException("Comment content cannot exceed 10,000 characters.", nameof(content));
    }
}