import { ProductResponse } from '@guitar-shop/shared-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, SliceNameSpace } from '../../constants';
import { dropCartData, getCartData, saveCartData } from '../../services/cart';
import { CartItem } from '../../types/cart';
import { RootState } from '../../types/store';

interface CartState {
  items: CartItem[] | null;
  status: LoadingStatus;
  error: string | null;
}

const initialState: CartState = {
  items: null,
  status: LoadingStatus.Idle,
  error: null,
};

export const loadCart = createAsyncThunk('cart/load', async (userId: number) => {
  const cart = getCartData(userId);

  return cart;
});

export const addProductToCart = createAsyncThunk('cart/add', async ({product, userId}: {product: ProductResponse, userId: number}, {getState}) => {
  const {cart: {items: cartItems}} = getState() as RootState;
  if (cartItems === null) {
    throw new Error();
  }

  const existingItem = cartItems.find((cartItem) => cartItem[0].id === product.id);
  if (!existingItem) {
    const newItem: CartItem = [product, 1];
    const newItems = [...cartItems, newItem];
    saveCartData(newItems, userId);
    return newItems;
  }

  const newItems = cartItems.map(
    (cartItem): CartItem => cartItem[0].id === product.id ? [cartItem[0], cartItem[1] + 1] : cartItem
  );
  saveCartData(newItems, userId);
  return newItems;
});

export const deleteProductFromCart = createAsyncThunk('cart/delete', async ({productId, userId}: {productId: number, userId: number}, {getState}) => {
  const {cart: {items: cartItems}} = getState() as RootState;
  if (cartItems === null) {
    throw new Error();
  }

  const newItems = cartItems.filter(([product]) => product.id !== productId);
  saveCartData(newItems, userId);
  return newItems;
});

export const incCartProduct = createAsyncThunk('cart/inc', async ({productId, userId}: {productId: number, userId: number}, {getState}) => {
  const {cart: {items: cartItems}} = getState() as RootState;
  if (cartItems === null) {
    throw new Error();
  }

  const newCartItems = cartItems.map(([product, quantity]): CartItem => {
    if (product.id === productId) {
      return [product, quantity + 1];
    } else {
      return [product, quantity];
    }
  });
  saveCartData(newCartItems, userId);
  return newCartItems;
});

export const decCartProduct = createAsyncThunk('cart/dec', async ({productId, userId}: {productId: number, userId: number}, {getState}) => {
  const {cart: {items: cartItems}} = getState() as RootState;
  if (cartItems === null) {
    throw new Error();
  }

  const newCartItems = cartItems.reduce((arr: CartItem[], [product, quantity]): CartItem[] => {
    if (product.id !== productId) {
      arr.push([product, quantity]);
      return arr;
    }

    const newCartItem: CartItem = [product, quantity - 1];
    if (newCartItem[1] > 0) {
      arr.push(newCartItem);
    }

    return arr;
  }, []);

  saveCartData(newCartItems, userId);
  return newCartItems;
});

export const clearCart = createAsyncThunk('cart/clear', async (userId: number) => {
  dropCartData(userId);
});

export const cartSlice = createSlice({
  name: SliceNameSpace.Cart,
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.items = null;
      state.error = null;
      state.status = LoadingStatus.Idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(loadCart.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(deleteProductFromCart.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(addProductToCart.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(incCartProduct.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(incCartProduct.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(incCartProduct.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(decCartProduct.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(decCartProduct.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(decCartProduct.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(clearCart.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
        state.items = [];
      });
  }
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectProductsFromCart = (state: RootState) => state.cart.items?.map(([product]) => product);
export const selectProductFromCart = (state: RootState, productId: number) => (
  state.cart.items?.find(([product]) => product.id === productId)?.[0]
);
export const selectCartProductCount = (state: RootState) => (
  state.cart.items?.reduce((sum, item) => sum + 1, 0) ?? 0
);

export const {
  resetCartState,
} = cartSlice.actions;
export default cartSlice.reducer;
