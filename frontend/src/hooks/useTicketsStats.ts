import { useQuery } from "@tanstack/react-query";
import { ticketsService } from "../api/tickets/ticketsService";

export function useTicketStats() {
  const query = useQuery({
    queryKey: ["tickets", "stats"],
    queryFn: () => ticketsService.getTicketStats(),
  });

  return {
    totalCount: query.data?.totalCount ?? 0,
    open: query.data?.open ?? 0,
    inProgress: query.data?.inProgress ?? 0,
    resolved: query.data?.resolved ?? 0,
    closed: query.data?.closed ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
