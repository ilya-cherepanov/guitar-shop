import { CreateOrderRequest, OrderListResponse, OrderResponse, OrdersQueryParams } from '@guitar-shop/shared-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';
import { LoadingStatus, SliceNameSpace } from '../../constants';
import { RootState } from '../../types/store';
import { buildQuery } from '../../utils';

interface OrdersState {
  orders: OrderResponse[] | null;
  error: string | null;
  status: LoadingStatus;
  page: number;
  totalPages: number;
}

const initialState: OrdersState = {
  orders: null,
  status: LoadingStatus.Idle,
  error: null,
  page: 0,
  totalPages: 0,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetch',
  async (queryParams: { [key in keyof OrdersQueryParams]: string }) => {
    const query = buildQuery(queryParams);
    const {data} = await api.get<OrderListResponse>(`/orders?${query}`);
    return data
  }
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (order: CreateOrderRequest) => {
    const {data} = await api.post<OrderResponse>(`/orders`, order);
    return data;
  },
);

export const deleteOrder = createAsyncThunk(
  'orders/delete',
  async (orderId: number) => {
    await api.delete(`/orders/${orderId}`);
  }
);

export const deleteOrderItem = createAsyncThunk(
  'orders/delterOrderItem',
  async ({ orderId, productId }: { orderId: number; productId: number }) => {
    await api.delete(`/orders/${orderId}/products/${productId}`);
  }
);

export const ordersSlice = createSlice({
  name: SliceNameSpace.Orders,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.orders = action.payload.items;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
      })
      .addCase(deleteOrderItem.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(deleteOrderItem.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteOrderItem.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
      });
  },
});

export const selectOrdersLoadingStatus = (state: RootState) =>
  state.orders.status;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersPage = (state: RootState) => ({
  page: state.orders.page,
  totalPages: state.orders.totalPages,
});
export const selectOrder = (state: RootState, orderId: number) =>
  state.orders.orders?.find((order) => order.id === orderId);

export default ordersSlice.reducer;
