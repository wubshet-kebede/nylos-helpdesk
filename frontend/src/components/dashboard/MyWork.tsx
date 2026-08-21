import { ArrowUpRight, CircleDot, Clock3, MoreHorizontal } from "lucide-react";
import type {
  TicketDto,
  TicketPriority,
  TicketStatus,
} from "../../api/tickets/types";
import { useGetTickets } from "../../hooks/useTicketsQuery";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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

const getStatusStyles = (status: TicketStatus) => {
  switch (status) {
    case "Open":
      return "bg-blue-50 text-blue-700";
    case "InProgress":
      return "bg-amber-50 text-amber-700";
    case "Resolved":
      return "bg-emerald-50 text-emerald-700";
    case "Closed":
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const formatStatusLabel = (status: TicketStatus) => {
  if (status === "InProgress") return "In Progress";
  return status;
};

const Priority_order: Record<TicketPriority, number> = {
  Urgent: 1,
  High: 2,
  Medium: 3,
  Low: 4,
};

export default function MyWork() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { data: ticketsData, isLoading } = useGetTickets();
  const ticketsList: TicketDto[] = ticketsData?.items ?? [];

  const myAssignedTickets = ticketsList.filter(
    (ticket: TicketDto) => ticket.assigneeId === currentUser?.id,
  );

  const sortedTickets = [...myAssignedTickets].sort(
    (a: TicketDto, b: TicketDto) => {
      const priorityA = Priority_order[a.priority] ?? 5;
      const priorityB = Priority_order[b.priority] ?? 5;
      return priorityA - priorityB;
    },
  );

  if (isLoading) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <span>Loading assigned work...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">My work</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              {sortedTickets.length}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Tickets currently assigned to you, sorted by urgency.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/app/my-work")}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
        >
          View all
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
      {sortedTickets.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <CircleDot size={18} />
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-700">
            No assigned tickets
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            You are all caught up for now!
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {sortedTickets.map((ticket: TicketDto) => {
            const priorityClass = getPriorityStyles(ticket.priority);
            const statusClass = getStatusStyles(ticket.status);
            const formattedDate = new Date(ticket.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              },
            );

            const StatusIcon = ticket.status === "Open" ? CircleDot : Clock3;

            return (
              <button
                key={ticket.id}
                type="button"
                className="group block w-full px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50/70 sm:px-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    <StatusIcon size={15} strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wide text-slate-400">
                        #{ticket.ticketNumber}
                      </span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] text-slate-400">
                        {formattedDate}
                      </span>
                    </div>

                    <p className="mt-1.5 truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
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
                  <span
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all group-hover:bg-white group-hover:text-slate-500 group-hover:opacity-100"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <MoreHorizontal size={16} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:px-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">
            Showing your assigned work
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            {sortedTickets.length} active
          </span>
        </div>
      </div>
    </section>
  );
}
