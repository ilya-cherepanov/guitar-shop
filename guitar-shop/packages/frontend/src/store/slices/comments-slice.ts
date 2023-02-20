import { CommentResponse, CreateCommentRequest } from '@guitar-shop/shared-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { INCORRECT_FORM, LoadingStatus, SliceNameSpace } from '../../constants';
import { RootState } from '../../types/store';
import { api } from '../api';

interface CommentsState {
  comments: CommentResponse[] | null;
  status: LoadingStatus;
  error: string | null;
  page: number;
}

const initialState: CommentsState = {
  comments: null,
  status: LoadingStatus.Idle,
  error: null,
  page: 0,
};

export const fetchComments = createAsyncThunk('comments/fetch', async (id: number) => {
  const {data} = await api.get<CommentResponse[]>(`products/${id}/comments`);
  return data;
});


export const createComment = createAsyncThunk('comments/create', async ({id, ...requestData}: CreateCommentRequest & {id: number}) => {
  try {
    const {data} = await api.post<CommentResponse>(`products/${id}/comments`, requestData);
    return {data};
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === HttpStatusCode.BadRequest) {
      toast.error(INCORRECT_FORM);
    }

    throw err;
  }
});


export const commentsSlice = createSlice({
  name: SliceNameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = LoadingStatus.Succeeded;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(createComment.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(createComment.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      });
  },
});

export const selectComments = (state: RootState, quantity: number) => (
  state.comments.comments?.slice(0, quantity)
);
export const selectCommentsLoadingStatus = (state: RootState) => state.comments.status;
export const selectCommentsCount = (state: RootState) => state.comments.comments?.length ?? 0;

export default commentsSlice.reducer;
