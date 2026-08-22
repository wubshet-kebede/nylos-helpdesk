import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, ArrowLeft } from "lucide-react";

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

export default function MyWorkPage() {
  const { user } = useAuth();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  const filters = useMemo(
    () => ({
      page: 1,
      pageSize: 50,
      assigneeId: user?.id,
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

  const handleTicketSelect = (id: string) => {
    setSelectedTicketId(id);
    setIsMobileDetailOpen(true);
  };

  return (
    <div className="min-h-full bg-[#fafafa]">
      <div className="border-b border-slate-200/80 bg-white">
        <div className="px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-950">
                  My Work
                </h1>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                  {isLoading ? "—" : tickets.length}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Tickets currently assigned to you.
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-5">
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

      <div className="p-3 sm:p-5 lg:p-6">
        <div className="grid min-h-[500px] lg:min-h-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[330px_minmax(0,1fr)]">
          <aside
            className={`border-slate-200 lg:border-r ${
              isMobileDetailOpen ? "hidden lg:block" : "block"
            }`}
          >
            <div className="flex h-14 items-center justify-between border-b border-slate-100 px-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-slate-800">
                  Assigned tickets
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

            <div className="max-h-[calc(100vh-220px)] lg:max-h-[620px] overflow-y-auto">
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
                    onClick={() => handleTicketSelect(ticket.id)}
                  />
                ))
              )}
            </div>
          </aside>

          <main
            className={`min-w-0 bg-white ${
              !isMobileDetailOpen ? "hidden lg:block" : "block"
            }`}
          >
            <div className="block lg:hidden border-b border-slate-100 px-4 py-3 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setIsMobileDetailOpen(false)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft size={16} />
                Back to ticket list
              </button>
            </div>

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
