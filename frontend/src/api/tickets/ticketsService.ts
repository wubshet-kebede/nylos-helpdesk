import { axiosClient } from "../axiosClient";
import type {
  TicketDto,
  CreateTicketRequest,
  UpdateTicketStatusRequest,
  AssignTicketRequest,
  PagedResponse,
  TicketFilters,
} from "./types";
export const ticketsService = {
  // Fetch all tickets with optional filtering
  getTickets: async (
    filters?: TicketFilters,
  ): Promise<PagedResponse<TicketDto>> => {
    const response = await axiosClient.get<PagedResponse<TicketDto>>(
      "/tickets",
      {
        params: filters,
      },
    );
    return response.data;
  },

  // Get a single ticket by ID
  getTicketById: async (id: string): Promise<TicketDto> => {
    const response = await axiosClient.get<TicketDto>(`/tickets/${id}`);
    return response.data;
  },

  // Create a new ticket
  createTicket: async (
    data: CreateTicketRequest,
  ): Promise<{ id: string; message: string }> => {
    const response = await axiosClient.post<{ id: string; message: string }>(
      "/tickets",
      data,
    );
    return response.data;
  },

  // Update status (e.g., Open -> InProgress -> Resolved)
  updateStatus: async (
    id: string,
    data: UpdateTicketStatusRequest,
  ): Promise<{ message: string }> => {
    const response = await axiosClient.patch<{ message: string }>(
      `/tickets/${id}/status`,
      data,
    );
    return response.data;
  },

  // Assign ticket to an agent
  assignTicket: async (
    id: string,
    data: AssignTicketRequest,
  ): Promise<{ message: string }> => {
    const response = await axiosClient.post<{ message: string }>(
      `/tickets/${id}/assign`,
      data,
    );
    return response.data;
  },

  // Delete/close ticket
  deleteTicket: async (id: string): Promise<{ message: string }> => {
    const response = await axiosClient.delete<{ message: string }>(
      `/tickets/${id}`,
    );
    return response.data;
  },
};
