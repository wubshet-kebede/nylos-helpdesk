import {
  ArrowUpRight,
  CircleDot,
  Clock3,
  MoreHorizontal,
  Pencil,
  Trash2,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import type {
  TicketDto,
  TicketPriority,
  TicketStatus,
} from "../../api/tickets/types";
import { useState, useEffect, useRef } from "react";
import EditTicketModal from "./EditTicketModal";
import Modal from "../common/Modal";
import UserAssignModal, { type WorkspaceUser } from "./UserAssignModal";
import { useDeleteTicket, useAssignTicket } from "../../hooks/useTicketsQuery";
import { useGetUsers } from "../../hooks/useUsersQuery";

interface TicketTableProps {
  tickets: TicketDto[];
  isLoading: boolean;
}

const getPriorityStyles = (priority: TicketPriority) => {
  switch (priority) {
    case "Urgent":
      return "bg-orange-50 text-orange-700";
    case "High":
      return "bg-rose-50 text-rose-700";
    case "Medium":
      return "bg-indigo-50 text-indigo-700";
    case "Low":
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getStatusStyles = (status: TicketStatus) => {
  switch (status) {
    case "Open":
      return "bg-blue-50 text-blue-700";
    case "InProgress":
      return "bg-amber-50 text-amber-700";
    case "Resolved":
      return "bg-emerald-50 text-emerald-700";
    case "Closed":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const formatStatusLabel = (status: TicketStatus) => {
  if (status === "InProgress") return "In Progress";
  return status;
};

const getInitials = (name?: string | null) => {
  if (!name) return "UN";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default function TicketTable({ tickets, isLoading }: TicketTableProps) {
  // State management for actions
  const [selectedTicket, setSelectedTicket] = useState<TicketDto | null>(null);
  const [ticketToDelete, setTicketToDelete] = useState<TicketDto | null>(null);
  const [ticketToAssign, setTicketToAssign] = useState<TicketDto | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Queries & Mutations
  const { mutateAsync: deleteTicket, isPending: isDeleting } =
    useDeleteTicket();
  const { mutateAsync: assignTicket } = useAssignTicket();
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsers();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!ticketToDelete) return;
    try {
      await deleteTicket(ticketToDelete.id);
      setTicketToDelete(null);
    } catch {
      // Handled by Axios Interceptor
    }
  };

  const handleUserSelect = async (user: WorkspaceUser) => {
    if (!ticketToAssign) return;
    try {
      await assignTicket({
        ticketId: ticketToAssign.id,
        AssigneeId: user.id,
      });
      setTicketToAssign(null);
    } catch {
      // Handled by Axios Interceptor
    }
  };

  if (isLoading) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <span>Loading workspace backlog...</span>
        </div>
      </section>
    );
  }

  if (tickets.length === 0) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <CircleDot size={20} />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900">
          No tickets found
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          There are no issues matching your current status or priority filter.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Table Header */}
      <div className="hidden border-b border-slate-100 bg-slate-50/50 px-6 py-3 md:grid md:grid-cols-[minmax(280px,1fr)_120px_140px_100px_110px_40px] md:items-center md:gap-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Ticket
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Priority
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Status
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Assignee
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Created
        </span>
        <span />
      </div>

      {/* Ticket Rows */}
      <div className="divide-y divide-slate-100">
        {tickets.map((ticket) => {
          const priorityClass = getPriorityStyles(ticket.priority);
          const statusClass = getStatusStyles(ticket.status);
          const formattedDate = new Date(ticket.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            },
          );
          const assignedUser = users.find((u) => u.id === ticket.assigneeId);
          const assigneeName = assignedUser ? assignedUser.name : "Unassigned";
          const assigneeInitials = getInitials(assigneeName);

          const isMenuOpen = activeMenuId === ticket.id;

          return (
            <div
              key={ticket.id}
              className="group relative transition-colors duration-150 hover:bg-slate-50/60"
            >
              <div className="hidden min-w-0 grid-cols-[minmax(280px,1fr)_120px_140px_100px_110px_40px] items-center gap-4 px-6 py-4 md:grid">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wide text-slate-400">
                      #{ticket.ticketNumber}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] text-slate-400">Issue</span>
                  </div>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
                    {ticket.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-400">
                    {ticket.description}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${priorityClass}`}
                  >
                    {ticket.priority}
                  </span>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${statusClass}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {formatStatusLabel(ticket.status)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    title={assigneeName}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-bold text-slate-600 shadow-sm"
                  >
                    {assigneeInitials}
                  </div>
                  <span className="hidden lg:inline text-xs font-semibold text-slate-600 truncate max-w-[90px]">
                    {assigneeName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock3 size={13} />
                  {formattedDate}
                </div>

                {/* Popover Action Menu */}
                <div className="relative" ref={isMenuOpen ? menuRef : null}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(isMenuOpen ? null : ticket.id);
                    }}
                    title="Actions"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-slate-200/80 bg-white p-1 shadow-lg ring-1 ring-slate-950/5 animate-in fade-in zoom-in-95 duration-100">
                      {/* Edit Option */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicket(ticket);
                          setActiveMenuId(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Pencil size={13} className="text-slate-400" />
                        <span>Edit Ticket</span>
                      </button>

                      {/* Assign Option */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTicketToAssign(ticket);
                          setActiveMenuId(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <UserPlus size={13} className="text-slate-400" />
                        <span>Assign Ticket</span>
                      </button>

                      {/* Delete Option */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTicketToDelete(ticket);
                          setActiveMenuId(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} className="text-rose-500" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile View */}
              <button
                type="button"
                className="flex w-full items-start gap-3 px-5 py-4 text-left md:hidden cursor-pointer"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                  <CircleDot size={16} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">
                      #{ticket.id.substring(0, 8)}
                    </span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400">
                      {formattedDate}
                    </span>
                  </div>

                  <p className="mt-1.5 truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                    {ticket.title}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${priorityClass}`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${statusClass}`}
                    >
                      {formatStatusLabel(ticket.status)}
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  size={15}
                  className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500"
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[11px] font-medium text-slate-400">
          Showing {tickets.length} retrieved tickets
        </p>
        <p className="text-[11px] font-semibold text-slate-500">
          Synced with backend
        </p>
      </div>

      {/* Edit Ticket Modal */}
      {selectedTicket && (
        <EditTicketModal
          isOpen={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
          ticket={selectedTicket}
        />
      )}

      {/* Delete Confirmation Modal */}
      {ticketToDelete && (
        <Modal
          isOpen={Boolean(ticketToDelete)}
          onClose={() => setTicketToDelete(null)}
          title="Delete Ticket"
          description="Are you sure you want to delete this ticket? This action cannot be undone."
          size="sm"
        >
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-3 text-rose-800">
              <AlertTriangle size={18} className="shrink-0 text-rose-600" />
              <p className="text-xs font-semibold truncate">
                {ticketToDelete.title}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setTicketToDelete(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-700 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </Modal>
      )}
      {ticketToAssign && (
        <UserAssignModal
          isOpen={Boolean(ticketToAssign)}
          onClose={() => setTicketToAssign(null)}
          users={users}
          isLoadingUsers={isLoadingUsers}
          onSelectUser={handleUserSelect}
        />
      )}
    </section>
  );
}
