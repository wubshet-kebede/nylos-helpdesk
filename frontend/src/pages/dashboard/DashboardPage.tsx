import { useState } from "react";
import { Activity, CheckCircle2, Clock3, Ticket, Archive } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import TicketActivity from "../../components/dashboard/TicketActivity";
import MyWork from "../../components/dashboard/MyWork";
import RecentTickets from "../../components/dashboard/RecentTickets";
import CreateTicketModal from "../../components/tickets/CreateTicketModal";
import { useTicketStats } from "../../hooks/useTicketsStats";
import { getGreeting } from "../../utils/getGreeting";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);

  const {
    totalCount,
    open,
    inProgress,
    resolved,
    closed,
    isLoading: isStatsLoading,
  } = useTicketStats();

  const { user, isLoading: isAuthLoading } = useAuth();
  const greeting = getGreeting();
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "there";

  const DASHBOARD_STATS = [
    {
      label: "Total Tickets",
      value: isStatsLoading ? "..." : totalCount,
      change: 0,
      description: "vs. last month",
      icon: Ticket,
      trend: "up" as const,
    },
    {
      label: "Open Tickets",
      value: isStatsLoading ? "..." : open,
      change: 0,
      description: "vs. last month",
      icon: Activity,
      trend: "down" as const,
    },
    {
      label: "In Progress",
      value: isStatsLoading ? "..." : inProgress,
      change: 0,
      description: "vs. last month",
      icon: Clock3,
      trend: "up" as const,
    },
    {
      label: "Resolved",
      value: isStatsLoading ? "..." : resolved,
      change: 0,
      description: "vs. last month",
      icon: CheckCircle2,
      trend: "up" as const,
    },
    {
      label: "Closed",
      value: isStatsLoading ? "..." : closed,
      change: 0,
      description: "vs. last month",
      icon: Archive,
      trend: "up" as const,
    },
  ];

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Page Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xl font-bold italic tracking-[0.16em] text-indigo-600">
              Workspace overview
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {isAuthLoading ? (
                <span className="inline-block h-10 w-64 animate-pulse rounded-lg bg-slate-200" />
              ) : (
                `${greeting}, ${firstName}.`
              )}
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Here's what's happening across your helpdesk workspace today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateTicketOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md cursor-pointer"
          >
            <Ticket size={16} />
            Create ticket
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
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
