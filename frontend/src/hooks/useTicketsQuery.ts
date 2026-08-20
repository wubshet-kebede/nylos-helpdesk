import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketsService } from "../api/tickets/ticketsService";
import type {
  TicketFilters,
  CreateTicketRequest,
  TicketStatus,
} from "../api/tickets/types";
import { type UpdateTicketRequest } from "../api/tickets/types";
// Query Key Factory
export const ticketKeys = {
  all: ["tickets"] as const,
  list: (filters?: TicketFilters) => ["tickets", "list", filters] as const,
  detail: (id: string) => ["tickets", "detail", id] as const,
};

// Hook to fetch tickets
export function useGetTickets(filters?: TicketFilters) {
  return useQuery({
    queryKey: ticketKeys.list(filters),
    queryFn: () => ticketsService.getTickets(filters),
  });
}

//  Hook to create a ticket
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

//  Hook to update ticket status
export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) =>
      ticketsService.updateStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
}
export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & UpdateTicketRequest) =>
      ticketsService.updateTicket({ id, data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket", variables.id] });
    },
  });
};
