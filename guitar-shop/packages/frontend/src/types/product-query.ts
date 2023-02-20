import { SortOrder } from '@guitar-shop/shared-types';

export type ProductQueryType = {
  page: string;
  productTypes?: string[];
  numbersOfStrings?: string[];
  minPrice?: string;
  maxPrice?: string;
  sortByPrice?: SortOrder;
  sortByRating?: SortOrder;
  sortByAdding?: SortOrder;
}
