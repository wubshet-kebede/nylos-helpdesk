import { Inbox, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyWorkState({
  title = "Nothing assigned to you",
  description = "Tickets assigned to your account will appear here when they need your attention.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <Inbox size={21} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>

      <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}

export function EmptySelectionState({
  title = "Select a ticket",
  description = "Choose a ticket from the list to view its details.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[620px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
          <AlertCircle size={19} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-slate-800">{title}</h3>

        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}
