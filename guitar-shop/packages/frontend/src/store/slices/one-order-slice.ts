import { OrderResponse } from '@guitar-shop/shared-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';
import { LoadingStatus, SliceNameSpace } from '../../constants';
import { RootState } from '../../types/store';

interface ProductsState {
  order: OrderResponse | null
  error: string | null;
  status: LoadingStatus;
}

const initialState: ProductsState = {
  order: null,
  status: LoadingStatus.Idle,
  error: null,
};

export const fetchOneOrder = createAsyncThunk('oneOrder/fetch', async (orderId: number) => {
  const {data} = await api.get<OrderResponse>(`/orders/${orderId}`);
  return data;
});

export const oneOrderSlice = createSlice({
  name: SliceNameSpace.OneOrder,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOneOrder.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchOneOrder.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOneOrder.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.order = action.payload;
      });
  },
});

export const selectOneOrder = (state: RootState) => state.oneOrder.order;
export const selectOneOrderStatus = (state: RootState) => state.oneOrder.status;

export default oneOrderSlice.reducer;
