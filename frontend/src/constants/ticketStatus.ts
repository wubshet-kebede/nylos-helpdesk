export type TicketStatusKey = "Open" | "InProgress" | "Resolved" | "Closed";

export interface StatusConfig {
  label: string;
  key: TicketStatusKey;
  color: string;
}

export const TICKET_STATUS_COLUMNS: StatusConfig[] = [
  {
    label: "Open",
    key: "Open",
    color: "bg-blue-500",
  },
  {
    label: "In Progress",
    key: "InProgress",
    color: "bg-amber-500",
  },
  {
    label: "Resolved",
    key: "Resolved",
    color: "bg-emerald-500",
  },
  {
    label: "Closed",
    key: "Closed",
    color: "bg-slate-400",
  },
];
