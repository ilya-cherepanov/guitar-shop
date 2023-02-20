import { ProductType } from './product-type.enum';
import { NUMBER_OF_STRINGS } from '@guitar-shop/core';


export type NumberOfStringsType = typeof NUMBER_OF_STRINGS[number];


export interface Product {
  id?: number;
  title: string;
  description: string;
  type: ProductType;
  article: string;
  numberOfStrings: NumberOfStringsType;
  photo: string;
  price: number;
  createdAt: Date;
  avgRating?: number;
  _count?: {
    comments: number,
  };
}
