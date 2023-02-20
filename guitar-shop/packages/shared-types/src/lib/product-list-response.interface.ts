import { ProductType } from './product-type.enum';
import { NumberOfStringsType } from './product.interface';


export interface ProductResponse {
  id: number;
  title: string;
  description: string;
  type: ProductType;
  numberOfStrings: NumberOfStringsType;
  price: number;
  createdAt: string;
  photo: string;
  article: string;
  avgRating: number;
  commentsCount: number;
}


export interface ProductListResponse {
  currentPage: number,
  totalPages: number,
  minPrice: number,
  maxPrice: number,
  items: ProductResponse[],
}
