import {
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  Clock3,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useGetTickets } from "../../hooks/useTicketsQuery";
import type { TicketPriority, TicketStatus } from "../../api/tickets/types";

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

const getInitials = (name?: string | null) => {
  if (!name) return "UN";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default function RecentTickets() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTickets({ page: 1, pageSize: 5 });
  const tickets = data?.items ?? [];
  const recentList = tickets.slice(0, 5);

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Recent tickets</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              Latest activity
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Recently created and updated tickets across the workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/app/tickets")}
          className="group inline-flex w-fit items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600 cursor-pointer"
        >
          View all tickets
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-xs font-semibold text-slate-400">
          Loading workspace activity...
        </div>
      ) : recentList.length === 0 ? (
        <div className="p-8 text-center text-xs font-medium text-slate-400">
          No recent tickets available.
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="w-2/5 px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Ticket
                  </th>
                  <th className="w-1/6 px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Priority
                  </th>
                  <th className="w-1/6 px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                  <th className="w-1/6 px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Assignee
                  </th>
                  <th className="w-1/6 px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Created
                  </th>
                  <th className="w-12 px-4 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentList.map((ticket) => {
                  const priorityClass = getPriorityStyles(ticket.priority);
                  const statusClass = getStatusStyles(ticket.status);
                  const initials = getInitials(ticket.assigneeName);
                  const formattedDate = new Date(
                    ticket.createdAt,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <tr
                      key={ticket.id}
                      className="group transition-colors duration-150 hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="relative group/tooltip max-w-full">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/app/tickets/${ticket.id}`)
                            }
                            className="w-full text-left cursor-pointer"
                          >
                            <span className="block text-[10px] font-bold tracking-wide text-slate-400">
                              {ticket.ticketNumber}
                            </span>

                            <span className="mt-1 block truncate text-sm font-semibold text-slate-800 transition-colors group-hover/tooltip:text-indigo-600">
                              {ticket.title}
                            </span>
                          </button>

                          <div className="pointer-events-none absolute left-0 bottom-full z-30 mb-2 hidden w-max max-w-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-xl group-hover/tooltip:block">
                            {ticket.title}
                            <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-white" />
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${priorityClass}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${statusClass}`}
                        >
                          {formatStatusLabel(ticket.status)}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            title={ticket.assigneeName || "Unassigned"}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600 shadow-xs"
                          >
                            {initials}
                          </div>

                          <span className="text-xs font-medium text-slate-600">
                            {ticket.assigneeName ? "Assigned" : "Unassigned"}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock3 size={13} />
                          {formattedDate}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => navigate(`/app/tickets/${ticket.id}`)}
                          aria-label={`Open ${ticket.ticketNumber}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all group-hover:bg-white group-hover:text-slate-500 group-hover:opacity-100 cursor-pointer"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 md:hidden">
            {recentList.map((ticket) => {
              const priorityClass = getPriorityStyles(ticket.priority);
              const statusClass = getStatusStyles(ticket.status);
              const formattedDate = new Date(
                ticket.createdAt,
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              return (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => navigate(`/app/tickets/${ticket.id}`)}
                  className="group flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50/70 cursor-pointer"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    <CircleDot size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">
                        {ticket.ticketNumber}
                      </span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] text-slate-400">
                        {formattedDate}
                      </span>
                    </div>

                    <div className="relative group/tooltip mt-1 max-w-full">
                      <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                        {ticket.title}
                      </p>

                      <div className="pointer-events-none absolute left-0 bottom-full z-30 mb-2 hidden w-max max-w-[250px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-xl group-hover/tooltip:block">
                        {ticket.title}
                        <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-white" />
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
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

                  <ChevronRight
                    size={16}
                    className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500"
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:px-6">
        <p className="text-[11px] font-medium text-slate-400">
          Showing the latest {recentList.length} ticket updates.
        </p>
      </div>
    </section>
  );
}
