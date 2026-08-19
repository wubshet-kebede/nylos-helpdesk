import { ArrowUpRight, CircleDot, Clock3, MoreHorizontal } from "lucide-react";

const MY_WORK_TICKETS = [
  {
    id: "NY-1042",
    title: "Authentication fails after password reset",
    priority: "High",
    priorityClass: "bg-rose-50 text-rose-700",
    status: "In Progress",
    statusClass: "bg-amber-50 text-amber-700",
    icon: Clock3,
    updated: "12 min ago",
  },
  {
    id: "NY-1045",
    title: "Customer portal returns 500 error",
    priority: "Urgent",
    priorityClass: "bg-orange-50 text-orange-700",
    status: "Open",
    statusClass: "bg-blue-50 text-blue-700",
    icon: CircleDot,
    updated: "34 min ago",
  },
  {
    id: "NY-1048",
    title: "Email notification not being delivered",
    priority: "Medium",
    priorityClass: "bg-indigo-50 text-indigo-700",
    status: "In Progress",
    statusClass: "bg-amber-50 text-amber-700",
    icon: Clock3,
    updated: "1 hr ago",
  },
] as const;

export default function MyWork() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">My work</h2>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              {MY_WORK_TICKETS.length}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Tickets currently assigned to you.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
        >
          View all
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Tickets */}
      <div className="divide-y divide-slate-100">
        {MY_WORK_TICKETS.map((ticket) => {
          const StatusIcon = ticket.icon;

          return (
            <button
              key={ticket.id}
              type="button"
              className="group block w-full px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50/70 sm:px-6"
            >
              <div className="flex items-start gap-3">
                {/* Ticket indicator */}
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                  <StatusIcon size={15} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wide text-slate-400">
                      #{ticket.id}
                    </span>

                    <span className="text-[10px] text-slate-300">•</span>

                    <span className="text-[10px] text-slate-400">
                      {ticket.updated}
                    </span>
                  </div>

                  <p className="mt-1.5 truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
                    {ticket.title}
                  </p>

                  {/* Metadata */}
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

                {/* More */}
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

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:px-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">
            Showing your highest priority work
          </span>

          <span className="text-[11px] font-semibold text-slate-500">
            {MY_WORK_TICKETS.length} active
          </span>
        </div>
      </div>
    </section>
  );
}
