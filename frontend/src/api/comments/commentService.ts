import { axiosClient } from "../axiosClient";

export interface CommentDto {
  id: string;
  ticketId: string;
  authorId: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string | null;
  isEdited: boolean;
}

export interface CreateCommentPayload {
  ticketId: string;
  content: string;
  isInternal?: boolean;
}

export const commentService = {
  getCommentsByTicketId: async (ticketId: string): Promise<CommentDto[]> => {
    const response = await axiosClient.get<CommentDto[]>(
      `/tickets/${ticketId}/comments`,
    );
    return response.data;
  },

  createComment: async ({
    ticketId,
    content,
    isInternal = false,
  }: CreateCommentPayload) => {
    const response = await axiosClient.post<{ id: string }>(
      `/tickets/${ticketId}/comments`,
      { content, isInternal },
    );
    return response.data;
  },
};
