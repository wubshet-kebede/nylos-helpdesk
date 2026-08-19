import { useState } from "react";
import { Plus, Ticket } from "lucide-react";
import TicketFilterBar from "../../components/tickets/TicketFilterBar";
import TicketTable from "../../components/tickets/TicketTable";
import TicketPagination from "../../components/tickets/TicketPagination";
import { useGetTickets } from "../../hooks/useTicketsQuery";
import type { TicketFilters } from "../../api/tickets/types";

export default function TicketListPage() {
  const [filters, setFilters] = useState<TicketFilters>({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading } = useGetTickets(filters);

  // Unpack paginated response securely
  const tickets = data?.items || [];
  const totalCount = data?.totalCount || 0;

  // Compute status counts from loaded items
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter(
    (t) => t.status === "InProgress",
  ).length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div className="min-w-0">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Ticket size={18} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                Workspace
              </p>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Tickets
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Manage, prioritize, and track issues across your helpdesk
              workspace.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 cursor-pointer"
          >
            <Plus size={17} strokeWidth={2.2} />
            Create ticket
          </button>
        </div>

        {/* Ticket Meta */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="font-semibold text-slate-700">
              {totalCount} tickets
            </span>
          </div>

          <div className="h-3 w-px bg-slate-200" />

          <span className="text-slate-400">{openCount} open</span>
          <span className="text-slate-400">{inProgressCount} in progress</span>
          <span className="text-slate-400">{resolvedCount} resolved</span>
        </div>

        {/* Toolbar */}
        <div className="mt-6">
          <TicketFilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Content Table */}
        <div className="mt-4">
          <TicketTable tickets={tickets} isLoading={isLoading} />
        </div>

        {/* Pagination Bar */}
        <div className="mt-3 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <TicketPagination
            filters={filters}
            onPageChange={setFilters}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
}
