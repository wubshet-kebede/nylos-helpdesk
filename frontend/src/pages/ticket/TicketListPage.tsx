import { useState } from "react";
import { Plus, Ticket } from "lucide-react";
import TicketFilterBar from "../../components/tickets/TicketFilterBar";
import TicketTable from "../../components/tickets/TicketTable";
import TicketPagination from "../../components/tickets/TicketPagination";
import type { TicketFilters } from "../../api/tickets/types";
import { useTicketStats } from "../../hooks/useTicketsStats";
import { useGetTickets } from "../../hooks/useTicketsQuery";
import { TICKET_STATUS_COLUMNS } from "../../constants/ticketStatus";

export default function TicketListPage() {
  const [filters, setFilters] = useState<TicketFilters>({
    page: 1,
    pageSize: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  const {
    totalCount: statsTotal,
    open,
    inProgress,
    resolved,
    closed,
  } = useTicketStats();

  const { data: ticketsData, isLoading } = useGetTickets(filters);

  const tickets = ticketsData?.items || [];
  const totalCount = ticketsData?.totalCount || statsTotal || 0;

  return (
    <div className="min-w-0">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          <span className="font-semibold text-slate-700">
            {statsTotal} total tickets
          </span>
          <span className="text-slate-400">{open} open</span>
          <span className="text-slate-400">{inProgress} in progress</span>
          <span className="text-slate-400">{resolved} resolved</span>
          <span className="text-slate-400">{closed} closed</span>
        </div>

        <div className="mt-6">
          <TicketFilterBar
            filters={filters}
            onFilterChange={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        <div className="mt-4">
          {viewMode === "list" ? (
            <TicketTable tickets={tickets} isLoading={isLoading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {TICKET_STATUS_COLUMNS.map((column) => {
                const columnTickets = tickets.filter(
                  (t) => t.status === column.key,
                );
                const count = columnTickets.length;

                return (
                  <div
                    key={column.key}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3"
                  >
                    <div className="flex items-center justify-between pb-3 px-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${column.color}`}
                        />
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {column.label}
                        </h3>
                      </div>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200">
                        {count}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {isLoading ? (
                        <div className="p-4 text-center text-xs text-slate-400">
                          Loading...
                        </div>
                      ) : columnTickets.length === 0 ? (
                        <div className="p-4 text-center text-[11px] text-slate-400 italic">
                          No {column.label.toLowerCase()} tickets
                        </div>
                      ) : (
                        columnTickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs hover:border-indigo-200 transition-colors"
                          >
                            <span className="text-[10px] font-bold text-indigo-600">
                              #{ticket.ticketNumber}
                            </span>
                            <p className="mt-1 text-xs font-semibold text-slate-900 truncate">
                              {ticket.title}
                            </p>
                            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
                                {ticket.priority}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {viewMode === "list" && (
          <div className="mt-3 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <TicketPagination
              filters={filters}
              onPageChange={setFilters}
              totalCount={totalCount}
            />
          </div>
        )}
      </div>
    </div>
  );
}
