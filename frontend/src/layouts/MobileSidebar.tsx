import {
  X,
  LayoutDashboard,
  Ticket,
  Inbox,
  Settings,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDisplayName } from "../utils/getDisplayName";
import { getInitials } from "../utils/getInitials";
interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

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

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const { user } = useAuth();

  const displayName = getDisplayName(user?.fullName);

  const initials = getInitials(user?.fullName);
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();

    // Authentication logic will be connected later.
    console.log("Logout");

    navigate("/login");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <NavLink
            to="/app/dashboard"
            onClick={onClose}
            className="group flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 transition-colors duration-200 group-hover:bg-indigo-600">
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

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {NAVIGATION.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "group relative flex items-center gap-3 rounded-xl px-3 py-3",
                      "text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute -left-4 h-6 w-0.5 rounded-r-full bg-indigo-600" />
                      )}

                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.3 : 1.9}
                        className={
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-600"
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

          <div className="my-7 h-px bg-slate-100" />

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
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-3 py-3",
                      "text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")
                  }
                >
                  <Icon size={19} strokeWidth={1.9} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {displayName}
              </p>

              <p className="truncate text-[11px] text-slate-400">
                {user?.userRole}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-700"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
