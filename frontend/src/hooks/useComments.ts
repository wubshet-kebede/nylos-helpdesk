import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  commentService,
  type CreateCommentPayload,
} from "../api/comments/commentService";
export const commentKeys = {
  all: ["comments"] as const,
  byTicket: (ticketId: string) =>
    [...commentKeys.all, "ticket", ticketId] as const,
};

// Fetch Comments for a specific ticket
export const useComments = (ticketId: string) => {
  return useQuery({
    queryKey: commentKeys.byTicket(ticketId),
    queryFn: () => commentService.getCommentsByTicketId(ticketId),
    enabled: Boolean(ticketId),
  });
};

// Create a Comment with automatic cache invalidation
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentPayload) =>
      commentService.createComment(payload),
    onSuccess: (_, variables) => {
      // Invalidate query to trigger an automatic background refetch for this ticket
      queryClient.invalidateQueries({
        queryKey: commentKeys.byTicket(variables.ticketId),
      });
    },
  });
};
