import type { TicketDto } from "../../api/tickets/types";
import { PriorityBadge, STATUS_CONFIG } from "./TicketBadges";

function formatDate(date?: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

interface TicketListItemProps {
  ticket: TicketDto;
  selected: boolean;
  onClick: () => void;
}

export function TicketListItem({
  ticket,
  selected,
  onClick,
}: TicketListItemProps) {
  const statusConfig = STATUS_CONFIG[ticket.status];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border-b border-slate-100 px-4 py-4 text-left transition cursor-pointer ${
        selected ? "bg-slate-50" : "bg-white hover:bg-slate-50/70"
      }`}
    >
      <div className="flex gap-3">
        <div className="pt-1">
          <span
            className={`block h-2 w-2 rounded-full ${statusConfig.dotClass}`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p
              className={`truncate text-sm ${
                selected
                  ? "font-semibold text-slate-950"
                  : "font-medium text-slate-800"
              }`}
            >
              {ticket.title}
            </p>

            <PriorityBadge priority={ticket.priority} />
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-400">
              {ticket.ticketNumber ?? `#${ticket.id.slice(0, 8)}`}
            </span>

            <span className="text-slate-300">·</span>

            <span className="text-[10px] text-slate-400">
              {formatDate(ticket.updatedAt ?? ticket.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
