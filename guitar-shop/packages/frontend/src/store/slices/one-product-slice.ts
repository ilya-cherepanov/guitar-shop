import { ProductResponse } from '@guitar-shop/shared-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';
import { LoadingStatus, SliceNameSpace } from '../../constants';
import { RootState } from '../../types/store';

interface ProductsState {
  product: ProductResponse | null;
  error: string | null;
  status: LoadingStatus;
}

const initialState: ProductsState = {
  product: null,
  status: LoadingStatus.Idle,
  error: null,
};

export const fetchOneProduct = createAsyncThunk('products/fetchOneProduct', async (id: number) => {
  return (await api.get<ProductResponse>(`/products/${id}`)).data;
});

export const oneProductSlice = createSlice({
  name: SliceNameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOneProduct.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(fetchOneProduct.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.product = action.payload;
      });
  },
});

export const selectLoadingStatus = (state: RootState) => state.oneProduct.status;
export const selectProduct = (state: RootState) => state.oneProduct.product;

export default oneProductSlice.reducer;
