import { ProductListResponse, ProductResponse, SortOrder } from '@guitar-shop/shared-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';
import { INCORRECT_FORM, LoadingStatus, SliceNameSpace } from '../../constants';
import { buildQuery } from '../../utils';
import { RootState } from '../../types/store';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ProductsState {
  products: ProductListResponse['items'] | null;
  error: string | null;
  status: LoadingStatus;
  currentPage: number;
  totalPages: number;
  minPrice: number;
  maxPrice: number;
}

const initialState: ProductsState = {
  products: null,
  status: LoadingStatus.Idle,
  error: null,
  currentPage: 0,
  totalPages: 0,
  minPrice: 0,
  maxPrice: 0,
};

type ProductQueryType = {
  page: string;
  productTypes?: string[];
  numbersOfStrings?: string[];
  minPrice?: string;
  maxPrice?: string;
  sortByPrice?: SortOrder;
  sortByRating?: SortOrder;
  sortByAdding?: SortOrder;
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (query: ProductQueryType) => {
  const queryString = buildQuery(query);
  const {data} = await api.get<ProductListResponse>(`/products?${queryString}`);
  return data;
});

export const createProduct = createAsyncThunk('product/create', async (newProduct: FormData) => {
  try {
    const {data} = await api.post<ProductResponse>('/products', newProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === HttpStatusCode.BadRequest) {
      toast.error(INCORRECT_FORM);
    }

    throw err;
  }
});

export const updateProduct = createAsyncThunk('product/update', async ({updatedProduct, id}: {updatedProduct: FormData, id: number}) => {
  try {
    const {data} = await api.put(`products/${id}`, updatedProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === HttpStatusCode.BadRequest) {
      toast.error(INCORRECT_FORM);
    }

    throw err;
  }
});

export const deleteProduct = createAsyncThunk('product/delete', async (productId: number) => {
  await api.delete(`/products/${productId}`);
});

export const productsSlice = createSlice({
  name: SliceNameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.products = action.payload.items;
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;
      })
      .addCase(createProduct.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
      })
      .addCase(updateProduct.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
      })
      .addCase(deleteProduct.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
      });
  },
});

export const selectLoadingStatus = (state: RootState) => state.products.status;
export const selectProducts = (state: RootState) => state.products.products;
export const selectPage = (state: RootState) => ({
  currentPage: state.products.currentPage,
  totalPages: state.products.totalPages,
});
export const selectProductsPrice = (state: RootState) => ({
  minPrice: state.products.minPrice,
  maxPrice: state.products.maxPrice,
});

export default productsSlice.reducer;
