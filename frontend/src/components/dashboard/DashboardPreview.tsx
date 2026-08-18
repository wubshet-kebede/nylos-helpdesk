import {
  LayoutDashboard,
  Ticket,
  MessageSquare,
  Users,
  Plus,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  Clock,
  CheckCircle2,
} from "lucide-react";

const PREVIEW_PRIORITY_MAP = {
  High: { icon: AlertCircle, classes: "bg-red-50 text-red-700 border-red-100" },
  Medium: {
    icon: AlertTriangle,
    classes: "bg-amber-50 text-amber-700 border-amber-100",
  },
  Low: {
    icon: ArrowDown,
    classes: "bg-slate-50 text-slate-600 border-slate-100",
  },
} as const;

const PREVIEW_STATUS_MAP = {
  Open: { icon: Clock, classes: "bg-blue-50 text-blue-700 border-blue-100" },
  "In Progress": {
    icon: Clock,
    classes: "bg-amber-50 text-amber-700 border-amber-100",
  },
  Resolved: {
    icon: CheckCircle2,
    classes: "bg-green-50 text-green-700 border-green-100",
  },
} as const;

const PREVIEW_TICKETS = [
  {
    id: "#NY-1042",
    title: "Database connection drops",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "#NY-1041",
    title: "Unable to upload attachment",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "#NY-1040",
    title: "Login authentication issue",
    priority: "Low",
    status: "Resolved",
  },
] as const;

export default function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-6xl text-left">
      {/* Dynamic Backing Glow decoration */}
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-indigo-500/10 blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
        {/* Browser Top Window Chrome Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="hidden rounded-md border border-slate-200 bg-white px-12 py-1 text-xs text-slate-400 sm:block">
            app.nylos.helpdesk
          </div>

          <div className="w-12" />
        </div>

        <div className="grid min-h-120 md:grid-cols-[200px_1fr]">
          {/* Dashboard Left Sidebar Layout */}
          <aside className="hidden border-r border-slate-200 bg-slate-950 p-5 md:block">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-md shadow-indigo-600/30">
                N
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Nylos</p>
                <p className="text-[10px] text-slate-400">Helpdesk</p>
              </div>
            </div>

            <nav className="space-y-1 text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 font-medium text-white">
                <LayoutDashboard size={16} />
                Dashboard
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 text-slate-400 hover:text-slate-200 transition cursor-pointer">
                <Ticket size={16} />
                Tickets
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 text-slate-400 hover:text-slate-200 transition cursor-pointer">
                <MessageSquare size={16} />
                Comments
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 text-slate-400 hover:text-slate-200 transition cursor-pointer">
                <Users size={16} />
                Users
              </div>
            </nav>
          </aside>

          {/* Core Panel Content Space */}
          <div className="bg-slate-50 p-5 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Overview</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-950">
                  Dashboard
                </h3>
              </div>

              <button className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition">
                <Plus size={16} /> New Ticket
              </button>
            </div>

            {/* Quick Metrics Analytics Cards */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Total Tickets", "128"],
                ["Open", "32"],
                ["In Progress", "41"],
                ["Resolved", "55"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Simulated Live Recent Tickets Table Feed */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h4 className="font-semibold text-slate-950">Recent Tickets</h4>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">
                  View all <ChevronRight size={14} />
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {PREVIEW_TICKETS.map((ticket) => {
                  const priorityMeta = PREVIEW_PRIORITY_MAP[ticket.priority];
                  const statusMeta = PREVIEW_STATUS_MAP[ticket.status];

                  const PriorityIcon = priorityMeta.icon;
                  const StatusIcon = statusMeta.icon;

                  return (
                    <div
                      key={ticket.id}
                      className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/50 transition"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          {ticket.id}
                        </p>
                        <p className="mt-0.5 font-medium text-slate-800">
                          {ticket.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium ${priorityMeta.classes}`}
                        >
                          <PriorityIcon size={12} />
                          {ticket.priority}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium ${statusMeta.classes}`}
                        >
                          <StatusIcon size={12} />
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
