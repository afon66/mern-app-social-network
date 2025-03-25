import { createSlice } from "@reduxjs/toolkit"
import { commentsApi } from "../../app/services/commentsApi"
import { type Comment } from "../../app/types"
import { type RootState } from "../../app/store"
import { postsApi } from "../../app/services/postsApi"

type InitialState = {
  comments: Comment[]
}

const initialState: InitialState = {
  comments: [],
}

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        commentsApi.endpoints.createComment.matchFulfilled,
        (state, action) => {
          state.comments = [...state.comments, action.payload]
        },
      )
      .addMatcher(
        commentsApi.endpoints.deleteComment.matchFulfilled,
        (state, action) => {
          console.log(action.payload)
          state.comments = state.comments.filter(
            comment => comment._id !== action.payload._id,
          )
        },
      )
      .addMatcher(
        postsApi.endpoints.getPostById.matchFulfilled,
        (state, action) => {
          state.comments = action.payload.comments
        },
      )
  },
})

export default slice.reducer
export const selectComments = (state: RootState) => state.comment.comments
