import { CheckCircle2, CircleDot, Clock3, Archive } from "lucide-react";
import type { TicketStatus, TicketPriority } from "../../api/tickets/types";

export const STATUS_CONFIG: Record<
  TicketStatus,
  {
    label: string;
    icon: typeof CircleDot;
    iconClass: string;
    dotClass: string;
  }
> = {
  Open: {
    label: "Open",
    icon: CircleDot,
    iconClass: "text-blue-600",
    dotClass: "bg-blue-500",
  },
  InProgress: {
    label: "In progress",
    icon: Clock3,
    iconClass: "text-amber-600",
    dotClass: "bg-amber-500",
  },
  Resolved: {
    label: "Resolved",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    dotClass: "bg-emerald-500",
  },
  Closed: {
    label: "Closed",
    icon: Archive,
    iconClass: "text-slate-500",
    dotClass: "bg-slate-400",
  },
};

export const PRIORITY_CONFIG: Record<
  TicketPriority,
  {
    label: string;
    className: string;
  }
> = {
  Low: {
    label: "Low",
    className: "text-slate-500 bg-slate-100",
  },
  Medium: {
    label: "Medium",
    className: "text-blue-700 bg-blue-50",
  },
  High: {
    label: "High",
    className: "text-amber-700 bg-amber-50",
  },
  Urgent: {
    label: "Urgent",
    className: "text-red-700 bg-red-50",
  },
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
      <Icon size={12} className={config.iconClass} />
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = PRIORITY_CONFIG[priority];

  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
