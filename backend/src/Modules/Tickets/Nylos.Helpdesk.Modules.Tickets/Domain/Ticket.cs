namespace Nylos.Helpdesk.Modules.Tickets.Domain;
/// <summary>
/// A Ticket domain entity with encapsulated business rules and workflow transitions.
/// </summary>
public class Ticket
{
    public Guid Id { get; private set; }
    public string TicketNumber { get; private set; } = string.Empty;
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public TicketPriority Priority { get; private set; }
    public TicketStatus Status { get; private set; }

    public Guid CreatedById { get; private set; }
    public Guid? AssigneeId { get; private set; }

    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    // Required by Entity Framework Core
    private Ticket() { }

    public Ticket(Guid id, string ticketNumber, string title, string description, TicketPriority priority, Guid createdById)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title cannot be empty.", nameof(title));
        if (string.IsNullOrWhiteSpace(ticketNumber))
            throw new ArgumentException("Ticket number cannot be empty.", nameof(ticketNumber));

        Id = id;
        TicketNumber = ticketNumber;
        Title = title;
        Description = description ?? string.Empty;
        Priority = priority;
        CreatedById = createdById;
        Status = TicketStatus.Open;
        CreatedAt = DateTime.UtcNow;
    }

    public void AssignToPeer(Guid assigneeID)
    {
        if (assigneeID == Guid.Empty)
            throw new ArgumentException("Agent ID must be a valid GUID.", nameof(assigneeID));

        AssigneeId = assigneeID;
        if (Status == TicketStatus.Open)
        {
            MoveToStatus(TicketStatus.InProgress);
        }
        else
        {
            UpdatedAt = DateTime.UtcNow;
        }
    }
    public void UpdateDetails(string title, string description, TicketPriority priority)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title cannot be empty.", nameof(title));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Description cannot be empty.", nameof(description));

        Title = title;
        Description = description;
        Priority = priority;
        UpdatedAt = DateTime.UtcNow;
    }
    /// <summary>
    /// Resolves the ticket, ensuring only the assigned agent can execute this action.
    /// </summary>
    public void Resolve(Guid currentUserId)
    {
        if (!AssigneeId.HasValue || AssigneeId.Value != currentUserId)
        {
            throw new InvalidOperationException("Only the assigned user can resolve this ticket.");
        }

        MoveToStatus(TicketStatus.Resolved);
    }
    /// <summary>
    /// Invalid status transitions are rejected.
    /// </summary>
    public bool CanTransitionTo(TicketStatus newStatus)
    {
        if (Status == newStatus) return true;

        return (Status, newStatus) switch
        {
            // Open can only move to InProgress
            (TicketStatus.Open, TicketStatus.InProgress) => true,

            // InProgress can move back to Open or forward to Resolved
            (TicketStatus.InProgress, TicketStatus.Open) => true,
            (TicketStatus.InProgress, TicketStatus.Resolved) => true,

            // Resolved can move to Closed or back to InProgress if re-opened
            (TicketStatus.Resolved, TicketStatus.Closed) => true,
            (TicketStatus.Resolved, TicketStatus.InProgress) => true,

            // All other transitions (like Open -> Closed) are blocked!
            _ => false
        };
    }

    public void MoveToStatus(TicketStatus newStatus)
    {
        if (!CanTransitionTo(newStatus))
        {
            throw new InvalidOperationException($"Cannot transition ticket from status '{Status}' directly to '{newStatus}'.");
        }

        Status = newStatus;
        UpdatedAt = DateTime.UtcNow;
    }
}