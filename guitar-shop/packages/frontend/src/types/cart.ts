import { ProductResponse } from '@guitar-shop/shared-types';

export type CartItem = [ProductResponse, number];
export type Cart = { [key: number]: CartItem[] };
