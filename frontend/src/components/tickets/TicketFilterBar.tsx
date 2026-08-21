import {
  useState,
  type Dispatch,
  type SetStateAction,
  useRef,
  useEffect,
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
  UserCheck,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type {
  TicketFilters,
  TicketPriority,
  TicketStatus,
} from "../../api/tickets/types";
import { useGetUsers } from "../../hooks/useUsersQuery";
import type { WorkspaceUser } from "./UserAssignModal";

export type SortField = "createdAt" | "updatedAt" | "priority";
export type SortOrder = "asc" | "desc";

const STATUS_OPTIONS: {
  label: string;
  value: TicketStatus | "all";
  colorDot: string;
}[] = [
  { label: "All statuses", value: "all", colorDot: "bg-slate-400" },
  { label: "Open", value: "Open", colorDot: "bg-blue-500" },
  { label: "In Progress", value: "InProgress", colorDot: "bg-amber-500" },
  { label: "Resolved", value: "Resolved", colorDot: "bg-emerald-500" },
  { label: "Closed", value: "Closed", colorDot: "bg-slate-500" },
];

const PRIORITY_OPTIONS: {
  label: string;
  value: TicketPriority | "all";
  colorClass: string;
}[] = [
  { label: "All priorities", value: "all", colorClass: "text-slate-500" },
  { label: "Low", value: "Low", colorClass: "text-slate-600" },
  { label: "Medium", value: "Medium", colorClass: "text-blue-600" },
  { label: "High", value: "High", colorClass: "text-amber-600 font-medium" },
  {
    label: "Urgent",
    value: "Urgent",
    colorClass: "text-rose-600 font-semibold",
  },
];

const SORT_OPTIONS: {
  label: string;
  field: SortField;
  order: SortOrder;
}[] = [
  { label: "Newest first", field: "createdAt", order: "desc" },
  { label: "Oldest first", field: "createdAt", order: "asc" },
  { label: "Recently updated", field: "updatedAt", order: "desc" },
  { label: "Least recently updated", field: "updatedAt", order: "asc" },
  { label: "Highest priority", field: "priority", order: "desc" },
  { label: "Lowest priority", field: "priority", order: "asc" },
];

interface TicketFilterBarProps {
  filters: TicketFilters & { sortBy?: SortField; sortOrder?: SortOrder };
  onFilterChange: Dispatch<
    SetStateAction<
      TicketFilters & { sortBy?: SortField; sortOrder?: SortOrder }
    >
  >;
  viewMode: "list" | "board";
  onViewModeChange: (view: "list" | "board") => void;
}

export default function TicketFilterBar({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: TicketFilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [activeDropdown, setActiveDropdown] = useState<
    "status" | "priority" | "assignee" | "sort" | null
  >(null);
  const [assigneeSearchTerm, setAssigneeSearchTerm] = useState("");

  const { data: users = [], isLoading: isLoadingUsers } = useGetUsers();

  const filterBarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedUser = users.find((u) => u.id === filters.assigneeId) || null;
  const currentStatusObj = STATUS_OPTIONS.find(
    (s) => s.value === (filters.status || "all"),
  );
  const currentPriorityObj = PRIORITY_OPTIONS.find(
    (p) => p.value === (filters.priority || "all"),
  );
  const currentSortObj = SORT_OPTIONS.find(
    (s) => s.field === filters.sortBy && s.order === filters.sortOrder,
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectStatus = (status: TicketStatus | "all") => {
    onFilterChange((prev) => ({
      ...prev,
      page: 1,
      status: status === "all" ? undefined : status,
    }));
    setActiveDropdown(null);
  };

  const handleSelectPriority = (priority: TicketPriority | "all") => {
    onFilterChange((prev) => ({
      ...prev,
      page: 1,
      priority: priority === "all" ? undefined : priority,
    }));
    setActiveDropdown(null);
  };

  const handleSelectSort = (field: SortField, order: SortOrder) => {
    onFilterChange((prev) => ({
      ...prev,
      page: 1,
      sortBy: field,
      sortOrder: order,
    }));
    setActiveDropdown(null);
  };

  const handleSelectUser = (user: WorkspaceUser | null) => {
    onFilterChange((prev) => ({
      ...prev,
      page: 1,
      assigneeId: user ? user.id : undefined,
    }));
    setActiveDropdown(null);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onFilterChange((prev) => ({
        ...prev,
        page: 1,
        search: searchInput.trim() || undefined,
      }));
    }
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setAssigneeSearchTerm("");
    onFilterChange({
      page: 1,
      pageSize: 10,
      status: undefined,
      priority: undefined,
      search: undefined,
      assigneeId: undefined,
      sortBy: undefined,
      sortOrder: undefined,
    });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(assigneeSearchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(assigneeSearchTerm.toLowerCase()),
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  const hasActiveFilters = Boolean(
    filters.status ||
    filters.priority ||
    filters.search ||
    filters.assigneeId ||
    filters.sortBy,
  );

  return (
    <div
      ref={filterBarRef}
      className="rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            ref={searchInputRef}
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

        <div className="hidden h-7 w-px bg-slate-200 lg:block" />

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown((prev) =>
                  prev === "status" ? null : "status",
                )
              }
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition cursor-pointer ${
                filters.status
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${currentStatusObj?.colorDot || "bg-slate-400"}`}
              />
              <span>
                {filters.status
                  ? `Status: ${currentStatusObj?.label}`
                  : "Status"}
              </span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {activeDropdown === "status" && (
              <div className="absolute left-0 lg:left-auto lg:right-0 top-11 z-30 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-950/5 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 border-b border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500">
                    Filter by status
                  </p>
                </div>
                <div className="mt-1 space-y-0.5">
                  {STATUS_OPTIONS.map((opt) => {
                    const isSelected = (filters.status || "all") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectStatus(opt.value)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50 text-indigo-700 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${opt.colorDot}`}
                          />
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && (
                          <Check
                            size={14}
                            className="text-indigo-600 shrink-0"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown((prev) =>
                  prev === "priority" ? null : "priority",
                )
              }
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition cursor-pointer ${
                filters.priority
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={14} className="text-slate-400" />
              <span>
                {filters.priority
                  ? `Priority: ${currentPriorityObj?.label}`
                  : "Priority"}
              </span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {activeDropdown === "priority" && (
              <div className="absolute left-0 lg:left-auto lg:right-0 top-11 z-30 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-950/5 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 border-b border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500">
                    Filter by priority
                  </p>
                </div>
                <div className="mt-1 space-y-0.5">
                  {PRIORITY_OPTIONS.map((opt) => {
                    const isSelected =
                      (filters.priority || "all") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectPriority(opt.value)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50 text-indigo-700 font-bold"
                            : `${opt.colorClass} hover:bg-slate-50`
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && (
                          <Check
                            size={14}
                            className="text-indigo-600 shrink-0"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown((prev) =>
                  prev === "assignee" ? null : "assignee",
                )
              }
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition cursor-pointer ${
                selectedUser
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <UserRound size={14} />
              <span className="hidden sm:inline">
                {selectedUser ? `Assignee: ${selectedUser.name}` : "Assignee"}
              </span>
              <span className="sm:hidden">
                {selectedUser ? selectedUser.name : "Assignee"}
              </span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {activeDropdown === "assignee" && (
              <div className="absolute right-0 top-11 z-30 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-slate-950/5 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2 pt-1 pb-2">
                  <p className="text-[11px] font-bold text-slate-500">
                    Filter by assignee
                  </p>
                  <div className="relative mt-2">
                    <Search
                      size={13}
                      className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      autoFocus
                      value={assigneeSearchTerm}
                      onChange={(e) => setAssigneeSearchTerm(e.target.value)}
                      placeholder="Type name or email..."
                      className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-xs text-slate-800 outline-none focus:border-indigo-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                  <button
                    type="button"
                    onClick={() => handleSelectUser(null)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-500">
                      Everyone (Clear filter)
                    </span>
                    {!selectedUser && (
                      <UserCheck size={14} className="text-indigo-600" />
                    )}
                  </button>

                  {isLoadingUsers ? (
                    <div className="p-3 text-center text-xs text-slate-400">
                      Loading users...
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-400">
                      No users found
                    </div>
                  ) : (
                    filteredUsers.map((user) => {
                      const isSelected = selectedUser?.id === user.id;
                      return (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => handleSelectUser(user)}
                          className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition-colors cursor-pointer ${
                            isSelected ? "bg-indigo-50/70" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700">
                              {getInitials(user.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">
                                {user.name}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <UserCheck
                              size={14}
                              className="text-indigo-600 shrink-0"
                            />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown((prev) => (prev === "sort" ? null : "sort"))
              }
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition cursor-pointer ${
                filters.sortBy
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <ArrowUpDown size={14} className="text-slate-400" />
              <span>
                {currentSortObj ? `Sort: ${currentSortObj.label}` : "Sort"}
              </span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {activeDropdown === "sort" && (
              <div className="absolute right-0 top-11 z-30 w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-950/5 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 border-b border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500">
                    Sort tickets by
                  </p>
                </div>
                <div className="mt-1 space-y-0.5">
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected =
                      filters.sortBy === opt.field &&
                      filters.sortOrder === opt.order;
                    return (
                      <button
                        key={`${opt.field}-${opt.order}`}
                        type="button"
                        onClick={() => handleSelectSort(opt.field, opt.order)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50 text-indigo-700 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {opt.order === "asc" ? (
                            <ArrowUp size={13} className="text-slate-400" />
                          ) : (
                            <ArrowDown size={13} className="text-slate-400" />
                          )}
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && (
                          <Check
                            size={14}
                            className="text-indigo-600 shrink-0"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            aria-label="Clear filters"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600 cursor-pointer"
          >
            <Filter size={15} />
          </button>
        </div>

        <div className="hidden h-7 w-px bg-slate-200 lg:block" />

        <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            aria-label="List view"
            onClick={() => onViewModeChange("list")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <List size={16} />
          </button>
          <button
            type="button"
            aria-label="Board view"
            onClick={() => onViewModeChange("board")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              viewMode === "board"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

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

          {selectedUser && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
              Assignee: {selectedUser.name}
              <button
                type="button"
                onClick={() =>
                  onFilterChange((p) => ({ ...p, assigneeId: undefined }))
                }
                className="rounded-full p-0.5 transition hover:bg-indigo-100 cursor-pointer"
              >
                <X size={11} />
              </button>
            </span>
          )}

          {currentSortObj && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
              Sort: {currentSortObj.label}
              <button
                type="button"
                onClick={() =>
                  onFilterChange((p) => ({
                    ...p,
                    sortBy: undefined,
                    sortOrder: undefined,
                  }))
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
