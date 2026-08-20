export type TicketStatus = "Open" | "InProgress" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";

export interface TicketDto {
  id: string;
  ticketNumber: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdById: string;
  createdByName?: string;
  assigneeId?: string | null;
  assigneeName?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}
export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface UpdateTicketStatusRequest {
  status: TicketStatus;
}

export interface AssignTicketRequest {
  assignedToUserId: string;
}

export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  search?: string;
  page?: number;
  pageSize?: number;
}
export interface UpdateTicketRequest {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
}
