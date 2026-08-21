import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketsService } from "../api/tickets/ticketsService";
import type {
  TicketFilters,
  CreateTicketRequest,
  TicketStatus,
  UpdateTicketRequest,
} from "../api/tickets/types";

// Query Key Factory
export const ticketKeys = {
  all: ["tickets"] as const,
  list: (filters?: TicketFilters) => ["tickets", "list", filters] as const,
  detail: (id: string) => ["tickets", "detail", id] as const,
};

// Hook to fetch tickets (filters is now optional)
export function useGetTickets(filters?: TicketFilters) {
  return useQuery({
    queryKey: ticketKeys.list(filters),
    queryFn: () => ticketsService.getTickets(filters),
  });
}
export function useGetTicketById(id: string) {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => ticketsService.getTicketById(id),
    enabled: Boolean(id),
  });
}
// Hook to create a ticket
export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) =>
      ticketsService.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
}

// Hook to update ticket status
export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: TicketStatus }) =>
      ticketsService.updateStatus(id, { newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
}

// Hook to update ticket details
export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & UpdateTicketRequest) =>
      ticketsService.updateTicket({ id, data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
      queryClient.invalidateQueries({
        queryKey: ticketKeys.detail(variables.id),
      });
    },
  });
};

// Hook to delete ticket
export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ticketsService.deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
};

// Hook to assign ticket
export const useAssignTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      AssigneeId,
    }: {
      ticketId: string;
      AssigneeId: string;
    }) => {
      return ticketsService.assignTicket(ticketId, { AssigneeId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
};
