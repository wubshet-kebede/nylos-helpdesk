import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PAGES = [1, 2, 3, 4, 5];

export default function TicketPagination() {
  const currentPage = 1;
  const totalPages = 13;

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {/* Result information */}
      <div className="text-xs text-slate-400">
        Showing <span className="font-semibold text-slate-600">1–10</span> of{" "}
        <span className="font-semibold text-slate-600">128</span> tickets
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {/* First page */}
        <button
          type="button"
          disabled={currentPage === 1}
          aria-label="First page"
          className="hidden h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
        >
          <ChevronsLeft size={14} />
        </button>

        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {PAGES.map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                aria-current={isActive ? "page" : undefined}
                className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {page}
              </button>
            );
          })}

          <span className="px-1 text-xs text-slate-300">...</span>

          <button
            type="button"
            className="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            {totalPages}
          </button>
        </div>

        {/* Next */}
        <button
          type="button"
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700"
        >
          <ChevronRight size={15} />
        </button>

        {/* Last page */}
        <button
          type="button"
          aria-label="Last page"
          className="hidden h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 sm:flex"
        >
          <ChevronsRight size={14} />
        </button>
      </div>
    </div>
  );
}
