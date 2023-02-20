import { configureStore } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../constants';
import { api } from './api';
import cartSlice from './slices/cart-slice';
import commentsSlice from './slices/comments-slice';
import oneOrderSlice from './slices/one-order-slice';
import oneProductSlice from './slices/one-product-slice';
import ordersSlice from './slices/orders-slice';
import productsReducer from './slices/products-slice';
import userSlice from './slices/user-slice';

export const store = configureStore({
  reducer: {
    [SliceNameSpace.Products]: productsReducer,
    [SliceNameSpace.OneProduct]: oneProductSlice,
    [SliceNameSpace.User]: userSlice,
    [SliceNameSpace.Cart]: cartSlice,
    [SliceNameSpace.Orders]: ordersSlice,
    [SliceNameSpace.Comments]: commentsSlice,
    [SliceNameSpace.OneOrder]: oneOrderSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});
