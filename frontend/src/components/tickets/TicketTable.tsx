import { ArrowUpRight, CircleDot, Clock3, MoreHorizontal } from "lucide-react";

const TICKETS = [
  {
    id: "NY-1048",
    title: "Email notification not being delivered",
    description: "Customers are not receiving email notifications.",
    priority: "Medium",
    priorityClass: "bg-indigo-50 text-indigo-700",
    status: "In Progress",
    statusClass: "bg-amber-50 text-amber-700",
    assignee: "HA",
    updated: "2 min ago",
  },
  {
    id: "NY-1047",
    title: "Customer unable to reset password",
    description: "Password reset flow returns an unexpected error.",
    priority: "High",
    priorityClass: "bg-rose-50 text-rose-700",
    status: "Open",
    statusClass: "bg-blue-50 text-blue-700",
    assignee: "WA",
    updated: "15 min ago",
  },
  {
    id: "NY-1046",
    title: "API request timing out intermittently",
    description: "Requests occasionally exceed the configured timeout.",
    priority: "Urgent",
    priorityClass: "bg-orange-50 text-orange-700",
    status: "In Progress",
    statusClass: "bg-amber-50 text-amber-700",
    assignee: "MK",
    updated: "32 min ago",
  },
  {
    id: "NY-1045",
    title: "Dashboard statistics displaying incorrect values",
    description: "Resolved tickets are not reflected in the dashboard.",
    priority: "Low",
    priorityClass: "bg-slate-100 text-slate-600",
    status: "Resolved",
    statusClass: "bg-emerald-50 text-emerald-700",
    assignee: "AB",
    updated: "1 hr ago",
  },
  {
    id: "NY-1044",
    title: "Unable to upload attachment",
    description: "File uploads fail for larger attachments.",
    priority: "High",
    priorityClass: "bg-rose-50 text-rose-700",
    status: "Open",
    statusClass: "bg-blue-50 text-blue-700",
    assignee: "DK",
    updated: "2 hrs ago",
  },
] as const;

export default function TicketTable() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Table header */}
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
          Updated
        </span>

        <span />
      </div>

      {/* Ticket rows */}
      <div className="divide-y divide-slate-100">
        {TICKETS.map((ticket) => (
          <div
            key={ticket.id}
            className="group relative transition-colors duration-150 hover:bg-slate-50/60"
          >
            {/* Desktop */}
            <div className="hidden min-w-0 grid-cols-[minmax(280px,1fr)_120px_140px_100px_110px_40px] items-center gap-4 px-6 py-4 md:grid">
              {/* Ticket */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wide text-slate-400">
                    #{ticket.id}
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
                  className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${ticket.priorityClass}`}
                >
                  {ticket.priority}
                </span>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${ticket.statusClass}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {ticket.status}
                </span>
              </div>

              {/* Assignee */}
              <div className="flex items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-bold text-slate-600 shadow-sm">
                  {ticket.assignee}
                </div>
              </div>

              {/* Updated */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock3 size={13} />
                {ticket.updated}
              </div>

              {/* Action */}
              <button
                type="button"
                aria-label={`Open ${ticket.id}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all group-hover:bg-white group-hover:text-slate-500 group-hover:opacity-100"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            {/* Mobile */}
            <button
              type="button"
              className="flex w-full items-start gap-3 px-5 py-4 text-left md:hidden"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                <CircleDot size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">
                    #{ticket.id}
                  </span>

                  <span className="text-[10px] text-slate-300">•</span>

                  <span className="text-[10px] text-slate-400">
                    {ticket.updated}
                  </span>
                </div>

                <p className="mt-1.5 truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                  {ticket.title}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${ticket.priorityClass}`}
                  >
                    {ticket.priority}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${ticket.statusClass}`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>

              <ArrowUpRight
                size={15}
                className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom meta */}
      <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[11px] font-medium text-slate-400">
          Showing 5 of 128 tickets
        </p>

        <p className="text-[11px] font-semibold text-slate-500">
          Updated just now
        </p>
      </div>
    </section>
  );
}
