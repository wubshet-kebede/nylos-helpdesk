import {
  ArrowUpRight,
  ChevronRight,
  Clock3,
  MoreHorizontal,
} from "lucide-react";

const RECENT_TICKETS = [
  {
    id: "NY-1048",
    title: "Email notification not being delivered",
    priority: "Medium",
    priorityClass: "bg-indigo-50 text-indigo-700",
    status: "In Progress",
    statusClass: "bg-amber-50 text-amber-700",
    updated: "2 min ago",
    assignee: "HA",
  },
  {
    id: "NY-1047",
    title: "Customer unable to reset password",
    priority: "High",
    priorityClass: "bg-rose-50 text-rose-700",
    status: "Open",
    statusClass: "bg-blue-50 text-blue-700",
    updated: "15 min ago",
    assignee: "WA",
  },
  {
    id: "NY-1046",
    title: "API request timing out intermittently",
    priority: "Urgent",
    priorityClass: "bg-orange-50 text-orange-700",
    status: "In Progress",
    statusClass: "bg-amber-50 text-amber-700",
    updated: "32 min ago",
    assignee: "MK",
  },
  {
    id: "NY-1045",
    title: "Dashboard statistics displaying incorrect values",
    priority: "Low",
    priorityClass: "bg-slate-100 text-slate-600",
    status: "Resolved",
    statusClass: "bg-emerald-50 text-emerald-700",
    updated: "1 hr ago",
    assignee: "AB",
  },
] as const;

export default function RecentTickets() {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Header */}
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
          className="group inline-flex w-fit items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
        >
          View all tickets
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Ticket
              </th>

              <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Priority
              </th>

              <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Assignee
              </th>

              <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Updated
              </th>

              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {RECENT_TICKETS.map((ticket) => (
              <tr
                key={ticket.id}
                className="group transition-colors duration-150 hover:bg-slate-50/70"
              >
                {/* Ticket */}
                <td className="max-w-md px-6 py-4">
                  <button type="button" className="text-left">
                    <span className="block text-[10px] font-bold tracking-wide text-slate-400">
                      #{ticket.id}
                    </span>

                    <span className="mt-1 block truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
                      {ticket.title}
                    </span>
                  </button>
                </td>

                {/* Priority */}
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${ticket.priorityClass}`}
                  >
                    {ticket.priority}
                  </span>
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${ticket.statusClass}`}
                  >
                    {ticket.status}
                  </span>
                </td>

                {/* Assignee */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600">
                      {ticket.assignee}
                    </div>

                    <span className="text-xs font-medium text-slate-600">
                      Assigned
                    </span>
                  </div>
                </td>

                {/* Updated */}
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock3 size={13} />
                    {ticket.updated}
                  </div>
                </td>

                {/* Action */}
                <td className="px-4 py-4">
                  <button
                    type="button"
                    aria-label={`Open ${ticket.id}`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all group-hover:bg-white group-hover:text-slate-500 group-hover:opacity-100"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="divide-y divide-slate-100 md:hidden">
        {RECENT_TICKETS.map((ticket) => (
          <button
            key={ticket.id}
            type="button"
            className="group flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50/70"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
              <Clock3 size={16} />
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

              <p className="mt-1 truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                {ticket.title}
              </p>

              <div className="mt-2 flex items-center gap-2">
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

            <ChevronRight
              size={16}
              className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500"
            />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:px-6">
        <p className="text-[11px] font-medium text-slate-400">
          Showing the latest {RECENT_TICKETS.length} ticket updates.
        </p>
      </div>
    </section>
  );
}
