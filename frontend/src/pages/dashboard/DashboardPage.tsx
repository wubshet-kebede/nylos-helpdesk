import { Activity, CheckCircle2, Clock3, Ticket } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import TicketActivity from "../../components/dashboard/TicketActivity";
import MyWork from "../../components/dashboard/MyWork";
import RecentTickets from "../../components/dashboard/RecentTickets";
import CreateTicketModal from "../../components/tickets/CreateTicketModal";
import { useState } from "react";
const DASHBOARD_STATS = [
  {
    label: "Total Tickets",
    value: 128,
    change: 12,
    description: "vs. last month",
    icon: Ticket,
    trend: "up" as const,
  },
  {
    label: "Open Tickets",
    value: 32,
    change: 4,
    description: "vs. last month",
    icon: Activity,
    trend: "down" as const,
  },
  {
    label: "In Progress",
    value: 18,
    change: 8,
    description: "vs. last month",
    icon: Clock3,
    trend: "up" as const,
  },
  {
    label: "Resolved",
    value: 78,
    change: 15,
    description: "vs. last month",
    icon: CheckCircle2,
    trend: "up" as const,
  },
] as const;
export default function DashboardPage() {
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Page Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
              Workspace overview
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Good evening, Wubshet.
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Here's what's happening across your helpdesk workspace today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateTicketOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md"
          >
            <Ticket size={16} />
            Create ticket
          </button>
        </div>
        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DASHBOARD_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        {/* Dashboard Content */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <TicketActivity />

          <MyWork />
        </div>
        <div className="mt-6">
          <RecentTickets />
        </div>
      </div>
      <CreateTicketModal
        isOpen={isCreateTicketOpen}
        onClose={() => setIsCreateTicketOpen(false)}
      />
    </div>
  );
}
