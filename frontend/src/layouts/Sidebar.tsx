import {
  LayoutDashboard,
  Ticket,
  Inbox,
  Settings,
  ChevronRight,
  Command,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDisplayName } from "../utils/getDisplayName";
import { getInitials } from "../utils/getInitials";
const NAVIGATION = [
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
] as const;

const SECONDARY_NAVIGATION = [
  {
    label: "Settings",
    to: "/app/settings",
    icon: Settings,
  },
] as const;

export default function Sidebar() {
  const { user } = useAuth();

  const displayName = getDisplayName(user?.fullName);

  const initials = getInitials(user?.fullName);
  return (
    <aside className="sticky top-0 flex  h-screen w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-slate-100 px-5">
        <NavLink to="/app/dashboard" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 shadow-sm transition-all duration-200 group-hover:bg-indigo-600">
            <span className="text-sm font-bold text-white">N</span>
          </div>

          <div className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-tight text-slate-900">
              Nylos
            </span>

            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Helpdesk
            </span>
          </div>
        </NavLink>
      </div>

      {/* Workspace */}
      <div className="px-4 pt-6">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </p>

          <Command size={13} className="text-slate-300" />
        </div>

        <nav className="space-y-1">
          {NAVIGATION.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5",
                    "text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute -left-4 h-6 w-0.5 rounded-r-full bg-indigo-600" />
                    )}

                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.3 : 1.9}
                      className={
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-400 transition-colors group-hover:text-slate-600"
                      }
                    />

                    <span className="flex-1">{item.label}</span>

                    {isActive && (
                      <ChevronRight size={14} className="text-indigo-400" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Secondary Navigation */}
      <div className="mt-8 px-4">
        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          System
        </p>

        <nav className="space-y-1">
          {SECONDARY_NAVIGATION.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5",
                    "text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.9}
                  className="text-slate-400 transition-colors group-hover:text-slate-600"
                />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Area */}
      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50">
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
            {initials}
          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {displayName}
            </p>

            <p className="truncate text-[11px] text-slate-400">
              {user?.userRole}
            </p>
          </div>

          {/* Logout */}
          <button
            type="button"
            aria-label="Log out"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white hover:text-slate-700 hover:shadow-sm"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
