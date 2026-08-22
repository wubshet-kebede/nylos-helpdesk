import {
  LayoutDashboard,
  Ticket,
  Inbox,
  SquarePen,
  Settings,
  LifeBuoy,
} from "lucide-react";

export const NAVIGATION = [
  {
    label: "Overview",
    to: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tickets",
    to: "/app/tickets",
    icon: Ticket,
  },
  {
    label: "My Work",
    to: "/app/my-work",
    icon: Inbox,
  },
  {
    label: "Created By Me",
    to: "/app/created-by-me",
    icon: SquarePen,
  },
] as const;
export const SECONDARY_NAVIGATION = [
  {
    label: "Settings",
    to: "/app/settings",
    icon: Settings,
  },
  {
    label: "Help & Support",
    to: "/app/support",
    icon: LifeBuoy,
  },
] as const;
export type NavigationItem = (typeof NAVIGATION)[number];
export type SecondaryNavigationItem = (typeof SECONDARY_NAVIGATION)[number];
