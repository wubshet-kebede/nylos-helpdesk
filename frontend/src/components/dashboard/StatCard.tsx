import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  change: number;
  description: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

export default function StatCard({
  label,
  value,
  change,
  description,
  icon: Icon,
  trend,
}: StatCardProps) {
  const isPositive = trend === "up";

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value.toLocaleString()}
          </p>
        </div>

        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-colors duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600">
          <Icon size={19} strokeWidth={1.9} />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-bold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          {Math.abs(change)}%
        </span>

        <span className="text-xs text-slate-400">{description}</span>
      </div>
    </div>
  );
}
