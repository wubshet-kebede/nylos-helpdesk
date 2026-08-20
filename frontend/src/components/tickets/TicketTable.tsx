import { ArrowUpRight, CircleDot, Clock3, MoreHorizontal } from "lucide-react";
import type {
  TicketDto,
  TicketPriority,
  TicketStatus,
} from "../../api/tickets/types";
import { useState } from "react";
import EditTicketModal from "./EditTicketModal";

interface TicketTableProps {
  tickets: TicketDto[];
  isLoading: boolean;
}

// Utility to pick priority badge colors
const getPriorityStyles = (priority: TicketPriority) => {
  switch (priority) {
    case "Urgent":
      return "bg-orange-50 text-orange-700";
    case "High":
      return "bg-rose-50 text-rose-700";
    case "Medium":
      return "bg-indigo-50 text-indigo-700";
    case "Low":
    default:
      return "bg-slate-100 text-slate-600";
  }
};

// Utility to pick status badge colors
const getStatusStyles = (status: TicketStatus) => {
  switch (status) {
    case "Open":
      return "bg-blue-50 text-blue-700";
    case "InProgress":
      return "bg-amber-50 text-amber-700";
    case "Resolved":
      return "bg-emerald-50 text-emerald-700";
    case "Closed":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

// Format status label for clean UI display
const formatStatusLabel = (status: TicketStatus) => {
  if (status === "InProgress") return "In Progress";
  return status;
};

// Extract initials for assignee avatar
const getInitials = (name?: string | null) => {
  if (!name) return "UN";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default function TicketTable({ tickets, isLoading }: TicketTableProps) {
  // Track specific ticket selected for editing
  const [selectedTicket, setSelectedTicket] = useState<TicketDto | null>(null);

  // Loading skeleton state
  if (isLoading) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <span>Loading workspace backlog...</span>
        </div>
      </section>
    );
  }

  // Empty state when no tickets match filters
  if (tickets.length === 0) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <CircleDot size={20} />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900">
          No tickets found
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          There are no issues matching your current status or priority filter.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Table Header */}
      <div className="hidden border-b border-slate-100 bg-slate-50/50 px-6 py-3 md:grid md:grid-cols-[minmax(280px,1fr)_120px_140px_100px_110px_40px] md:items-center md:gap-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Ticket
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Priority
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Status
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Assignee
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Created
        </span>
        <span />
      </div>

      {/* Ticket Rows */}
      <div className="divide-y divide-slate-100">
        {tickets.map((ticket) => {
          const priorityClass = getPriorityStyles(ticket.priority);
          const statusClass = getStatusStyles(ticket.status);
          const assigneeInitials = getInitials(ticket.assigneeName);
          const formattedDate = new Date(ticket.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            },
          );

          return (
            <div
              key={ticket.id}
              className="group relative transition-colors duration-150 hover:bg-slate-50/60"
            >
              {/* Desktop View */}
              <div className="hidden min-w-0 grid-cols-[minmax(280px,1fr)_120px_140px_100px_110px_40px] items-center gap-4 px-6 py-4 md:grid">
                {/* Ticket Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wide text-slate-400">
                      #{ticket.ticketNumber}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] text-slate-400">Issue</span>
                  </div>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
                    {ticket.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {ticket.description}
                  </p>
                </div>

                {/* Priority */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${priorityClass}`}
                  >
                    {ticket.priority}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${statusClass}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {formatStatusLabel(ticket.status)}
                  </span>
                </div>

                {/* Assignee */}
                <div className="flex items-center">
                  <div
                    title={ticket.assigneeName || "Unassigned"}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-bold text-slate-600 shadow-sm"
                  >
                    {assigneeInitials}
                  </div>
                </div>

                {/* Created / Updated */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock3 size={13} />
                  {formattedDate}
                </div>

                {/* Actions */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTicket(ticket);
                  }}
                  aria-label={`Edit ${ticket.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Mobile View */}
              <button
                type="button"
                className="flex w-full items-start gap-3 px-5 py-4 text-left md:hidden cursor-pointer"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                  <CircleDot size={16} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">
                      #{ticket.id.substring(0, 8)}
                    </span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400">
                      {formattedDate}
                    </span>
                  </div>

                  <p className="mt-1.5 truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                    {ticket.title}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${priorityClass}`}
                    >
                      {ticket.priority}
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${statusClass}`}
                    >
                      {formatStatusLabel(ticket.status)}
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  size={15}
                  className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500"
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Meta Bar */}
      <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[11px] font-medium text-slate-400">
          Showing {tickets.length} retrieved tickets
        </p>

        <p className="text-[11px] font-semibold text-slate-500">
          Synced with backend
        </p>
      </div>

      {/* Edit Ticket Modal conditionally rendered with active ticket */}
      {selectedTicket && (
        <EditTicketModal
          isOpen={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
          ticket={selectedTicket}
        />
      )}
    </section>
  );
}
