import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import {
  useGetTickets,
  useUpdateTicketStatus,
} from "../../hooks/useTicketsQuery";
import type { TicketDto } from "../../api/tickets/types";

import { TicketListItem } from "../../components/tickets/TicketListItem";
import { TicketDetails } from "../../components/tickets/TicketDetails";
import { HeaderMetric } from "../../components/common/HeaderMetric";
import {
  EmptyWorkState,
  EmptySelectionState,
} from "../../components/common/EmptyStates";
import {
  TicketListSkeleton,
  TicketDetailsSkeleton,
} from "../../components/common/Skeletons";

export default function CreatedByMePage() {
  const { user } = useAuth();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      page: 1,
      pageSize: 50,
      createdById: user?.id, // Fetch tickets created by logged-in user
    }),
    [user?.id],
  );

  const { data, isLoading } = useGetTickets(filters);
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateTicketStatus();

  const tickets: TicketDto[] = data?.items ?? [];

  const selectedTicket =
    tickets.find((ticket) => ticket.id === selectedTicketId) ??
    tickets[0] ??
    null;

  useEffect(() => {
    if (!selectedTicketId && tickets.length > 0) {
      setSelectedTicketId(tickets[0].id);
    }
  }, [tickets, selectedTicketId]);

  const activeCount = tickets.filter(
    (ticket) => ticket.status === "Open" || ticket.status === "InProgress",
  ).length;

  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;

  const handleStatusChange = async (status: "Resolved" | "Closed") => {
    if (!selectedTicket) return;
    await updateStatus({ id: selectedTicket.id, newStatus: status });
  };

  return (
    <div className="min-h-full bg-[#fafafa]">
      {/* Page header */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="px-5 py-6 sm:px-7 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-slate-950">
                  Created by Me
                </h1>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                  {isLoading ? "—" : tickets.length}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Tickets created by you across all projects.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <HeaderMetric
                label="Active"
                value={isLoading ? "—" : activeCount}
              />

              <div className="h-7 w-px bg-slate-200" />

              <HeaderMetric
                label="Resolved"
                value={isLoading ? "—" : resolvedCount}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main workspace */}
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="grid min-h-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[330px_minmax(0,1fr)]">
          {/* LEFT: ticket navigator */}
          <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <div className="flex h-14 items-center justify-between border-b border-slate-100 px-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-slate-800">
                  My Created Tickets
                </h2>

                <span className="text-[10px] font-medium text-slate-400">
                  {isLoading ? "—" : tickets.length}
                </span>
              </div>

              <button
                type="button"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="max-h-[620px] overflow-y-auto">
              {isLoading ? (
                <TicketListSkeleton />
              ) : tickets.length === 0 ? (
                <EmptyWorkState />
              ) : (
                tickets.map((ticket) => (
                  <TicketListItem
                    key={ticket.id}
                    ticket={ticket}
                    selected={ticket.id === selectedTicket?.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                  />
                ))
              )}
            </div>
          </aside>

          {/* RIGHT: selected ticket */}
          <main className="min-w-0 bg-white">
            {isLoading ? (
              <TicketDetailsSkeleton />
            ) : selectedTicket ? (
              <TicketDetails
                ticket={selectedTicket}
                onStatusChange={handleStatusChange}
                isUpdating={isUpdating}
              />
            ) : (
              <EmptySelectionState />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
