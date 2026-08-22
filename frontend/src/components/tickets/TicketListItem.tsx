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
      className={`w-full border-b border-slate-100 px-3 py-3.5 sm:px-4 sm:py-4 text-left transition cursor-pointer ${
        selected ? "bg-slate-100" : "bg-white hover:bg-slate-50/70"
      }`}
    >
      <div className="flex gap-2.5 sm:gap-3">
        <div className="pt-1 shrink-0">
          <span
            className={`block h-2 w-2 rounded-full ${statusConfig.dotClass}`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`truncate max-w-[180px] xs:max-w-[240px] sm:max-w-none text-xs sm:text-sm ${
                selected
                  ? "font-semibold text-slate-950"
                  : "font-medium text-slate-800"
              }`}
            >
              {ticket.title}
            </p>

            <div className="shrink-0">
              <PriorityBadge priority={ticket.priority} />
            </div>
          </div>

          <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[10px] text-slate-400 shrink-0">
              {ticket.ticketNumber ?? `#${ticket.id.slice(0, 8)}`}
            </span>

            <span className="text-slate-300">·</span>

            <span className="text-[10px] text-slate-400 shrink-0">
              {formatDate(ticket.updatedAt ?? ticket.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
