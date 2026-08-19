import { Bell, ChevronDown, Command, Menu, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getDisplayName } from "../utils/getDisplayName";
import { getInitials } from "../utils/getInitials";
interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { user } = useAuth();

  const displayName = getDisplayName(user?.fullName);
  const initials = getInitials(user?.fullName);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-2 text-sm sm:flex">
            <span className="font-medium text-slate-400">Workspace</span>

            <span className="text-slate-300">/</span>

            <span className="font-semibold text-slate-800">Overview</span>
          </div>
        </div>

        <button
          type="button"
          className="group absolute left-1/2 hidden w-full max-w-md -translate-x-1/2 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-left transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm md:flex"
        >
          <Search
            size={17}
            className="shrink-0 text-slate-400 transition-colors group-hover:text-slate-600"
          />

          <span className="flex-1 truncate text-sm text-slate-400">
            Search tickets, users, or commands...
          </span>

          <span className="flex shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-semibold text-slate-400 shadow-sm">
            <Command size={10} />
            <span>K</span>
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

          <button
            type="button"
            className="group flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-slate-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-700">
              {initials}
            </div>

            <div className="hidden text-left lg:block">
              <p className="max-w-28 truncate text-xs font-semibold text-slate-800">
                {displayName}
              </p>

              <p className="text-[10px]  text-slate-400">{user?.userRole}</p>
            </div>

            <ChevronDown
              size={14}
              className="hidden text-slate-400 transition-transform group-hover:text-slate-600 lg:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
