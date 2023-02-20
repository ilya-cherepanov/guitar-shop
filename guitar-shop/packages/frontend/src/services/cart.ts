import { CART_KEY_NAME } from '../constants';
import { Cart, CartItem } from '../types/cart';


export function getCartData(userId: number): CartItem[] {
  const cartJson = localStorage.getItem(CART_KEY_NAME);

  if (!cartJson) {
    const newCart: Cart = {
      [userId]: [],
    };
    localStorage.setItem(CART_KEY_NAME, JSON.stringify(newCart));
    return [];
  }

  const cartData = JSON.parse(cartJson) as Cart;
  const userCart = cartData[userId];

  if (!userCart) {
    const newCart = {
      ...cartData,
      [userId]: [],
    };
    localStorage.setItem(CART_KEY_NAME, JSON.stringify(newCart));
    return [];
  }

  return userCart;
}

export function saveCartData(products: CartItem[], userId: number) {
  const cartJson = localStorage.getItem(CART_KEY_NAME);

  if (!cartJson) {
    const cartData: Cart = {
      [userId]: products,
    };
    localStorage.setItem(CART_KEY_NAME, JSON.stringify(cartData));
    return;
  }

  const cartData = JSON.parse(cartJson) as Cart;
  cartData[userId] = products;
  localStorage.setItem(CART_KEY_NAME, JSON.stringify(cartData));
  return true;
}

export function dropCartData(userId: number) {
  const cartJson = localStorage.getItem(CART_KEY_NAME);
  if (!cartJson) {
    return;
  }

  const cartData = JSON.parse(cartJson) as Cart;
  cartData[userId] = [];
  localStorage.setItem(CART_KEY_NAME, JSON.stringify(cartData));
}
