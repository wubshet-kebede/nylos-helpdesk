import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Clock3,
  AlertCircle,
  Archive,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useTicketStats } from "../../hooks/useTicketsStats";

export default function TicketActivity() {
  const navigate = useNavigate();

  const { totalCount, open, inProgress, resolved, closed, isLoading } =
    useTicketStats();

  const getPercentage = (value: number) =>
    totalCount > 0 ? Math.round((value / totalCount) * 100) : 0;

  const openPercentage = getPercentage(open);
  const inProgressPercentage = getPercentage(inProgress);
  const resolvedPercentage = getPercentage(resolved);
  const closedPercentage = getPercentage(closed);

  const activityData = [
    {
      label: "Open",
      value: open,
      percentage: openPercentage,
      icon: CircleDot,
      dotClass: "bg-blue-500",
      iconClass: "text-blue-600",
      barClass: "bg-blue-500",
    },
    {
      label: "In progress",
      value: inProgress,
      percentage: inProgressPercentage,
      icon: Clock3,
      dotClass: "bg-amber-500",
      iconClass: "text-amber-600",
      barClass: "bg-amber-500",
    },
    {
      label: "Resolved",
      value: resolved,
      percentage: resolvedPercentage,
      icon: CheckCircle2,
      dotClass: "bg-emerald-500",
      iconClass: "text-emerald-600",
      barClass: "bg-emerald-500",
    },
    {
      label: "Closed",
      value: closed,
      percentage: closedPercentage,
      icon: Archive,
      dotClass: "bg-slate-400",
      iconClass: "text-slate-500",
      barClass: "bg-slate-400",
    },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-[15px] font-semibold tracking-tight text-slate-950">
              Ticket activity
            </h2>

            <span className="text-[11px] font-medium text-slate-400">
              {isLoading ? "—" : `${totalCount} total`}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Current workload across your workspace
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/app/tickets")}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
        >
          View all
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Distribution */}
      <div className="px-5 pb-6 sm:px-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="flex h-full w-full">
            {activityData.map((item) => (
              <div
                key={item.label}
                className={`${item.barClass} transition-all duration-700`}
                style={{
                  width: `${isLoading ? 0 : item.percentage}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {activityData.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${item.dotClass}`} />

              <span className="text-[11px] font-medium text-slate-500">
                {item.label}
              </span>

              <span className="text-[11px] font-semibold text-slate-800">
                {isLoading ? "—" : item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-6 grid grid-cols-2 divide-x divide-y divide-slate-100 border-y border-slate-100 sm:grid-cols-4 sm:divide-y-0">
          {activityData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="px-3 py-4 first:pl-0 last:pr-0 sm:px-4 sm:py-3"
              >
                <div className="flex items-center gap-1.5">
                  <Icon size={13} strokeWidth={2} className={item.iconClass} />

                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </span>
                </div>

                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-xl font-semibold tracking-tight text-slate-950">
                    {isLoading ? "—" : item.value}
                  </span>

                  <span className="text-[10px] font-medium text-slate-400">
                    {isLoading ? "" : `${item.percentage}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Insight */}
        <div className="mt-5 flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <AlertCircle size={14} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800">
              {isLoading
                ? "Updating workspace activity"
                : resolvedPercentage >= 50
                  ? "Most of your workload is resolved"
                  : "Your active workload needs attention"}
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              {isLoading
                ? "Fetching the latest ticket distribution."
                : `${resolvedPercentage}% of all tickets are currently resolved.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
