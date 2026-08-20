export type TicketStatus = "Open" | "InProgress" | "Resolved" | "Closed";

export interface TicketPermissions {
  canEditDetails: boolean; // Creator only
  canResolve: boolean; // Assignee only
  canClose: boolean; // Creator only
}

export const getTicketPermissions = (
  ticket: { creatorId: string; assigneeId?: string; status: TicketStatus },
  currentUserId: string,
): TicketPermissions => {
  const isCreator = ticket.creatorId === currentUserId;
  const isAssignee = ticket.assigneeId === currentUserId;

  return {
    canEditDetails: isCreator && ticket.status !== "Closed",
    canResolve: isAssignee && ticket.status === "InProgress",
    canClose: isCreator && ticket.status === "Resolved",
  };
};
