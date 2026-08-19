import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
} from "react";
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
import type {
  TicketFilters,
  TicketPriority,
  TicketStatus,
} from "../../api/tickets/types";

const STATUS_OPTIONS: { label: string; value: TicketStatus | "all" }[] = [
  { label: "All statuses", value: "all" },
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "InProgress" },
  { label: "Resolved", value: "Resolved" },
  { label: "Closed", value: "Closed" },
];

const PRIORITY_OPTIONS: { label: string; value: TicketPriority | "all" }[] = [
  { label: "All priorities", value: "all" },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Urgent", value: "Urgent" },
];

interface TicketFilterBarProps {
  filters: TicketFilters;
  onFilterChange: Dispatch<SetStateAction<TicketFilters>>;
}

export default function TicketFilterBar({
  filters,
  onFilterChange,
}: TicketFilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Update status filter
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange((prev) => ({
      ...prev,
      page: 1, // Reset page on filter change
      status: value === "all" ? undefined : (value as TicketStatus),
    }));
  };

  // Update priority filter
  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange((prev) => ({
      ...prev,
      page: 1,
      priority: value === "all" ? undefined : (value as TicketPriority),
    }));
  };

  // Update search with ENTER or blur
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onFilterChange((prev) => ({
        ...prev,
        page: 1,
        search: searchInput.trim() || undefined,
      }));
    }
  };

  // Clear all filters back to default
  const handleClearFilters = () => {
    setSearchInput("");
    onFilterChange({
      page: 1,
      pageSize: 10,
      status: undefined,
      priority: undefined,
      search: undefined,
    });
  };

  const hasActiveFilters = Boolean(
    filters.status || filters.priority || filters.search,
  );

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
        {/* Search Input */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search tickets... (Press Enter)"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          />

          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 shadow-sm sm:block">
            /
          </kbd>
        </div>

        {/* Desktop Divider */}
        <div className="hidden h-7 w-px bg-slate-200 lg:block" />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Select Dropdown */}
          <div className="relative group inline-flex items-center">
            <span className="pointer-events-none absolute left-3 z-10 h-2 w-2 rounded-full bg-blue-500" />
            <select
              value={filters.status || "all"}
              onChange={handleStatusChange}
              className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-7 pr-8 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 text-slate-400 transition-transform group-hover:translate-y-0.5"
            />
          </div>

          {/* Priority Select Dropdown */}
          <div className="relative group inline-flex items-center">
            <SlidersHorizontal
              size={14}
              className="pointer-events-none absolute left-3 z-10 text-slate-400"
            />
            <select
              value={filters.priority || "all"}
              onChange={handlePriorityChange}
              className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-8 pr-8 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {PRIORITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 text-slate-400 transition-transform group-hover:translate-y-0.5"
            />
          </div>

          {/* Assigned to me Toggle Button */}
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 cursor-pointer"
          >
            <UserRound size={14} />
            <span className="hidden sm:inline">Assigned to me</span>
            <span className="sm:hidden">Mine</span>
          </button>

          {/* Reset Action */}
          <button
            type="button"
            onClick={handleClearFilters}
            aria-label="More filters"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600 cursor-pointer"
          >
            <Filter size={15} />
          </button>
        </div>

        {/* View Switcher */}
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
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:text-slate-700 cursor-pointer"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Active Filter Badges Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-3">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Active Filters
          </span>

          {filters.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
              Status: {filters.status}
              <button
                type="button"
                onClick={() =>
                  onFilterChange((p) => ({ ...p, status: undefined }))
                }
                className="rounded-full p-0.5 transition hover:bg-indigo-100 cursor-pointer"
              >
                <X size={11} />
              </button>
            </span>
          )}

          {filters.priority && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
              Priority: {filters.priority}
              <button
                type="button"
                onClick={() =>
                  onFilterChange((p) => ({ ...p, priority: undefined }))
                }
                className="rounded-full p-0.5 transition hover:bg-indigo-100 cursor-pointer"
              >
                <X size={11} />
              </button>
            </span>
          )}

          {filters.search && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
              Search: "{filters.search}"
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  onFilterChange((p) => ({ ...p, search: undefined }));
                }}
                className="rounded-full p-0.5 transition hover:bg-indigo-100 cursor-pointer"
              >
                <X size={11} />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          >
            <Check size={11} />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
