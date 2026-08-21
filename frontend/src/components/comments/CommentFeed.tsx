import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Lock,
  Eye,
  Edit3,
  User,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useComments, useCreateComment } from "../../hooks/useComments";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/getInitials";
interface CommentFeedProps {
  ticketId: string;
}

export const CommentFeed: React.FC<CommentFeedProps> = ({ ticketId }) => {
  const { data: comments, isLoading, isError } = useComments(ticketId);
  const createCommentMutation = useCreateComment();
  const { user } = useAuth();
  const displayName = getInitials(user?.fullName);
  const [content, setContent] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim() || createCommentMutation.isPending) return;

    createCommentMutation.mutate(
      { ticketId, content: content.trim(), isInternal },
      {
        onSuccess: () => {
          setContent("");
          setIsInternal(false);
          setActiveTab("write");
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            Activity & Discussion
          </h3>
        </div>
        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          {comments?.length || 0}
        </span>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-2.5 sm:gap-3 animate-pulse">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-100 rounded w-1/3 sm:w-1/4" />
                <div className="h-16 bg-slate-50 rounded-lg w-full border border-slate-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="p-3 sm:p-4 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center gap-3 text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <p className="text-xs font-medium">
            Failed to load comments. Please refresh or try again.
          </p>
        </div>
      )}

      {/* Comment List */}
      {!isLoading && !isError && (
        <div className="space-y-4 sm:space-y-6 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-0.5 before:bg-slate-100">
          {comments?.length === 0 ? (
            <div className="text-center py-6 sm:py-8 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 text-xs font-medium">
                No comments on this ticket yet.
              </p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Start the discussion using the editor below.
              </p>
            </div>
          ) : (
            comments?.map((comment) => (
              <div
                key={comment.id}
                className="relative flex gap-2.5 sm:gap-3 group"
              >
                <div className="relative z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold shrink-0 shadow-xs">
                  <span className="text-xs font-medium text-slate-700">
                    {displayName}
                  </span>
                </div>

                <div
                  className={`flex-1 rounded-lg border overflow-hidden transition-all shadow-xs min-w-0 ${
                    comment.isInternal
                      ? "bg-amber-50/60 border-amber-200/80"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-[11px] flex flex-wrap items-center justify-between gap-1.5 border-b ${
                      comment.isInternal
                        ? "bg-amber-100/50 border-amber-200/60 text-amber-800"
                        : "bg-slate-50/80 border-slate-100 text-slate-500"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 min-w-0">
                      <span className="font-semibold text-slate-800 truncate max-w-[120px] sm:max-w-none">
                        {user?.fullName}
                      </span>
                      <span>commented</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-[10px] sm:text-[11px]">
                        {formatDate(comment.createdAt)}
                      </span>
                      {comment.isEdited && (
                        <span className="italic text-slate-400">(edited)</span>
                      )}
                    </div>

                    {comment.isInternal && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-amber-200/70 text-amber-900 border border-amber-300/60 shrink-0">
                        <Lock className="w-2.5 h-2.5" /> Internal Note
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-3.5 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans break-words">
                    {comment.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Form Editor */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 sm:mt-8 relative flex gap-2.5 sm:gap-3"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-white shrink-0 shadow-xs">
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
        </div>

        <div className="flex-1 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400 transition-all min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 pt-2 gap-2 bg-slate-50/80 border-b border-slate-200">
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-t-md transition-colors border-t border-x ${
                  activeTab === "write"
                    ? "bg-white border-slate-200 text-slate-900 border-b-transparent -mb-px"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Edit3 className="w-3 h-3" /> Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-t-md transition-colors border-t border-x ${
                  activeTab === "preview"
                    ? "bg-white border-slate-200 text-slate-900 border-b-transparent -mb-px"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Eye className="w-3 h-3" /> Preview
              </button>
            </div>

            <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none pb-1.5 sm:pb-1">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-950 accent-slate-900 cursor-pointer"
              />
              <Lock className="w-3 h-3 text-amber-600" />
              <span>Internal Note</span>
            </label>
          </div>

          <div className="p-2.5 sm:p-3">
            {activeTab === "write" ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Leave a comment or internal note... (Cmd/Ctrl + Enter to submit)"
                rows={3}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-y min-h-[80px] sm:min-h-[90px]"
              />
            ) : (
              <div className="min-h-[80px] sm:min-h-[90px] text-xs sm:text-sm text-slate-700 p-2 rounded bg-slate-50 border border-slate-100 whitespace-pre-wrap break-words">
                {content.trim() ? (
                  content
                ) : (
                  <span className="text-slate-400 italic">
                    Nothing to preview
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-3 py-2 bg-slate-50/50 border-t border-slate-100">
            <span className="hidden sm:inline-block text-[10px] font-medium text-slate-400">
              Press{" "}
              <kbd className="px-1 py-0.5 text-[9px] font-mono bg-white border border-slate-200 rounded text-slate-600 shadow-2xs">
                Cmd
              </kbd>{" "}
              +{" "}
              <kbd className="px-1 py-0.5 text-[9px] font-mono bg-white border border-slate-200 rounded text-slate-600 shadow-2xs">
                Enter
              </kbd>{" "}
              to post
            </span>

            <button
              type="submit"
              disabled={!content.trim() || createCommentMutation.isPending}
              className="w-full sm:w-auto ml-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-950 hover:bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
            >
              {createCommentMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Comment
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
