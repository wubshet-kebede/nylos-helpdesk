import type { Dispatch, SetStateAction } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { TicketFilters } from "../../api/tickets/types";

interface TicketPaginationProps {
  filters: TicketFilters;
  onPageChange: Dispatch<SetStateAction<TicketFilters>>;
  totalCount?: number;
}

export default function TicketPagination({
  filters,
  onPageChange,
  totalCount = 0,
}: TicketPaginationProps) {
  const currentPage = filters.page || 1;
  const pageSize = filters.pageSize || 10;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Compute item index range
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange((prev) => ({
      ...prev,
      page,
    }));
  };

  // Generate page numbers to display dynamically
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {/* Result Information */}
      <div className="text-xs text-slate-400">
        Showing{" "}
        <span className="font-semibold text-slate-600">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-semibold text-slate-600">{totalCount}</span>{" "}
        tickets
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {/* First Page */}
        <button
          type="button"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          aria-label="First page"
          className="hidden h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex cursor-pointer"
        >
          <ChevronsLeft size={14} />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => goToPage(1)}
                className="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
              >
                1
              </button>
              {pages[0] > 2 && (
                <span className="px-1 text-xs text-slate-300">...</span>
              )}
            </>
          )}

          {pages.map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {page}
              </button>
            );
          })}

          {pages[pages.length - 1] < totalPages && (
            <>
              {pages[pages.length - 1] < totalPages - 1 && (
                <span className="px-1 text-xs text-slate-300">...</span>
              )}
              <button
                type="button"
                onClick={() => goToPage(totalPages)}
                className="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Page */}
        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight size={15} />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
          className="hidden h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex cursor-pointer"
        >
          <ChevronsRight size={14} />
        </button>
      </div>
    </div>
  );
}
