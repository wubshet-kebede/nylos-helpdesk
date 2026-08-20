import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Loader2,
  MoreHorizontal,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { TicketDto } from "../../api/tickets/types";
import { useAuth } from "../../context/AuthContext";
import { PriorityBadge, StatusBadge, STATUS_CONFIG } from "./TicketBadges";

function formatDate(date?: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function SectionLabel({ label }: { label: string }) {
  return (
    <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
      {label}
    </h2>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-800">{value}</p>
    </div>
  );
}

interface TicketDetailsProps {
  ticket: TicketDto;
  onStatusChange: (status: "Resolved" | "Closed") => void;
  isUpdating: boolean;
}

export function TicketDetails({
  ticket,
  onStatusChange,
  isUpdating,
}: TicketDetailsProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Action guards
  const isAssignee = ticket.assigneeId === user?.id;
  const isCreator = ticket.createdById === user?.id;

  const canResolve = isAssignee && ticket.status === "InProgress";
  const canClose = isCreator && ticket.status === "Resolved";

  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5 lg:px-8">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-medium text-slate-400">
                {ticket.ticketNumber ?? `#${ticket.id.slice(0, 8)}`}
              </span>

              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
            </div>

            <h1 className="mt-3 max-w-3xl text-xl font-semibold tracking-tight text-slate-950">
              {ticket.title}
            </h1>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <MoreHorizontal size={17} />
          </button>
        </div>

        {/* Action Controls */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {/* Resolve Button for Assignees */}
          {canResolve && (
            <button
              type="button"
              onClick={() => onStatusChange("Resolved")}
              disabled={isUpdating}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isUpdating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <CheckCircle2 size={14} />
              )}
              {isUpdating ? "Updating..." : "Mark as resolved"}
            </button>
          )}

          {/* Close Button for Creators */}
          {canClose && (
            <button
              type="button"
              onClick={() => onStatusChange("Closed")}
              disabled={isUpdating}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isUpdating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <XCircle size={14} />
              )}
              {isUpdating ? "Updating..." : "Mark as closed"}
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(`/tickets/${ticket.id}`)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          >
            Open ticket
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-7 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel label="Description" />

          <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {ticket.description || "No description provided."}
          </div>

          <div className="mt-10 border-t border-slate-100 pt-6">
            <SectionLabel label="Ticket details" />

            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              <DetailItem label="Priority" value={ticket.priority} />
              <DetailItem
                label="Status"
                value={STATUS_CONFIG[ticket.status].label}
              />
              <DetailItem
                label="Created"
                value={formatDate(ticket.createdAt)}
              />
              <DetailItem
                label="Updated"
                value={formatDate(ticket.updatedAt)}
              />
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-6">
            <SectionLabel label="Assignment" />

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <UserRound size={15} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-800">
                  {ticket.assigneeName ? ticket.assigneeName : "Unassigned"}
                </p>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  {isAssignee
                    ? "You are responsible for this ticket."
                    : "Assigned team member responsible for resolution."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
