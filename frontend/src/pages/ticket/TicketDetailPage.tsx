import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  useGetTicketById,
  useUpdateTicketStatus,
} from "../../hooks/useTicketsQuery";
import { TicketDetails } from "../../components/tickets/TicketDetails";
import { EmptySelectionState } from "../../components/common/EmptyStates";
import { TicketDetailsSkeleton } from "../../components/common/Skeletons";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: ticket, isLoading, error } = useGetTicketById(id ?? "");
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateTicketStatus();

  const handleStatusChange = async (status: "Resolved" | "Closed") => {
    if (!ticket) return;
    await updateStatus({ id: ticket.id, newStatus: status });
  };

  return (
    <div className="min-h-full bg-[#fafafa]">
      <div className="border-b border-slate-200/80 bg-white px-5 py-4 sm:px-7 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Tickets
        </button>
      </div>
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="min-h-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <TicketDetailsSkeleton />
          ) : ticket ? (
            <TicketDetails
              ticket={ticket}
              onStatusChange={handleStatusChange}
              isUpdating={isUpdating}
            />
          ) : (
            <div className="p-8 text-center">
              <EmptySelectionState />
              <p className="mt-2 text-xs text-red-500">
                {error ? "Failed to load ticket details." : "Ticket not found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
