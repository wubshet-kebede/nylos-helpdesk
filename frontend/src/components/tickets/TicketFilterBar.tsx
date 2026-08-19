import {
  Check,
  ChevronDown,
  Filter,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in-progress" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
] as const;

const PRIORITY_OPTIONS = [
  { label: "All priorities", value: "all" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
] as const;

export default function TicketFilterBar() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search tickets..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          />

          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 shadow-sm sm:block">
            /
          </kbd>
        </div>

        {/* Desktop divider */}
        <div className="hidden h-7 w-px bg-slate-200 lg:block" />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <button
            type="button"
            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Status
            <ChevronDown
              size={14}
              className="text-slate-400 transition-transform group-hover:translate-y-0.5"
            />
          </button>

          {/* Priority */}
          <button
            type="button"
            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <SlidersHorizontal size={14} className="text-slate-400" />
            Priority
            <ChevronDown
              size={14}
              className="text-slate-400 transition-transform group-hover:translate-y-0.5"
            />
          </button>

          {/* Assigned to me */}
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600"
          >
            <UserRound size={14} />
            <span className="hidden sm:inline">Assigned to me</span>
            <span className="sm:hidden">Mine</span>
          </button>

          {/* More filters */}
          <button
            type="button"
            aria-label="More filters"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600"
          >
            <Filter size={15} />
          </button>
        </div>

        {/* View switcher */}
        <div className="hidden h-7 w-px bg-slate-200 lg:block" />

        <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            aria-label="List view"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm"
          >
            <List size={16} />
          </button>

          <button
            type="button"
            aria-label="Board view"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:text-slate-700"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Active filters */}
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-3">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Filters
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
          All tickets
          <button
            type="button"
            aria-label="Remove filter"
            className="rounded-full p-0.5 transition hover:bg-indigo-100"
          >
            <X size={11} />
          </button>
        </span>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <Check size={11} />
          Clear filters
        </button>
      </div>
    </div>
  );
}
