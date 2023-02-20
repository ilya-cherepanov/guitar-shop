import { ProductType } from "./product-type.enum";
import { NumberOfStringsType } from "./product.interface";

export interface OrderResponse {
  id: number;
  orderItems: {
    productId: number;
    quantity: number;
    sumPrice: number;
    product: {
      id: number;
      title: string;
      type: ProductType;
      article: string;
      numberOfStrings: NumberOfStringsType;
      price: number;
      photo: string;
    };
  }[];
  createdAt: string;
  sumPrice: number;
}
