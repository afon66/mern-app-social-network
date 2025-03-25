import type { Comment } from "../types"
import { api } from "./api"

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: newComment => ({
        url: "/comments",
        method: "POST", 
        body: newComment,
      }),
    }),
      deleteComment: builder.mutation<Comment, string>({
        query: commentId => ({
          url: `/comments/${commentId}`,
          method: "DELETE",
        }),
      }),
    getAllComments: builder.query<Comment[], void>({
      query: (id) => ({
        url: "/comments",
        method: "GET",
      }),
    }),
  }),
})

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
  useLazyGetAllCommentsQuery,
} = commentsApi
export const {
  endpoints: { createComment, deleteComment, getAllComments },
} = commentsApi
