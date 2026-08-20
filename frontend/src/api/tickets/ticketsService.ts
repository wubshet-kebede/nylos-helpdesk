import { axiosClient } from "../axiosClient";
import type {
  TicketDto,
  CreateTicketRequest,
  UpdateTicketStatusRequest,
  AssignTicketRequest,
  PagedResponse,
  TicketFilters,
  UpdateTicketRequest,
} from "./types";

export const ticketsService = {
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

  getTicketById: async (id: string): Promise<TicketDto> => {
    const response = await axiosClient.get<TicketDto>(`/tickets/${id}`);
    return response.data;
  },

  createTicket: async (
    data: CreateTicketRequest,
  ): Promise<{ id: string; message: string }> => {
    const response = await axiosClient.post<{ id: string; message: string }>(
      "/tickets",
      data,
    );
    return response.data;
  },

  // Update ticket title, description, and priority
  updateTicket: async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateTicketRequest;
  }): Promise<{ message: string }> => {
    const response = await axiosClient.put<{ message: string }>(
      `/tickets/${id}`,
      data,
    );
    return response.data;
  },

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

  deleteTicket: async (id: string): Promise<{ message: string }> => {
    const response = await axiosClient.delete<{ message: string }>(
      `/tickets/${id}`,
    );
    return response.data;
  },
};
