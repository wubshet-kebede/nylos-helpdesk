import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Clock3,
} from "lucide-react";

const TICKET_ACTIVITY = [
  {
    label: "Open",
    value: 32,
    percentage: 25,
    icon: CircleDot,
    iconClass: "text-blue-600 bg-blue-50",
    barClass: "bg-blue-500",
  },
  {
    label: "In Progress",
    value: 18,
    percentage: 14,
    icon: Clock3,
    iconClass: "text-amber-600 bg-amber-50",
    barClass: "bg-amber-500",
  },
  {
    label: "Resolved",
    value: 78,
    percentage: 61,
    icon: CheckCircle2,
    iconClass: "text-emerald-600 bg-emerald-50",
    barClass: "bg-emerald-500",
  },
] as const;

export default function TicketActivity() {
  const total = TICKET_ACTIVITY.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Ticket activity
            </h2>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              {total} total
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Current distribution across your workspace.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
        >
          View tickets
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Activity */}
      <div className="p-5 sm:p-6">
        <div className="space-y-6">
          {TICKET_ACTIVITY.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}
                    >
                      <Icon size={17} strokeWidth={2} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {item.label}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.value} tickets
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-slate-700">
                    {item.percentage}%
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${item.barClass}`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer insight */}
        <div className="mt-7 flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
            <AlertCircle size={15} />
          </div>

          <div>
            <p className="text-xs font-bold text-indigo-900">
              Resolution rate is looking healthy
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-indigo-700/70">
              61% of your current tickets have already been resolved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
