import { useMemo } from "react";
import { useGetTickets } from "./useTicketsQuery";
import type { TicketFilters } from "../api/tickets/types";

export function useTicketStats(filters?: TicketFilters) {
  const query = useGetTickets(filters);
  const { data } = query;

  const stats = useMemo(() => {
    const tickets = data?.items || [];
    const totalCount = data?.totalCount || 0;

    let open = 0;
    let inProgress = 0;
    let resolved = 0;
    let closed = 0;

    for (const ticket of tickets) {
      switch (ticket.status) {
        case "Open":
          open++;
          break;
        case "InProgress":
          inProgress++;
          break;
        case "Resolved":
          resolved++;
          break;
        case "Closed":
          closed++;
          break;
      }
    }

    return {
      tickets,
      totalCount,
      open,
      inProgress,
      resolved,
      closed,
    };
  }, [data]);

  return {
    ...query,
    ...stats,
  };
}
