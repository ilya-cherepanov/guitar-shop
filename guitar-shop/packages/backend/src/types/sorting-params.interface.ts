import { SortOrder } from '@guitar-shop/shared-types';


export interface SortingParams {
  sortByAdding: SortOrder;
  sortByRating?: SortOrder;
  sortByPrice?: SortOrder;
}
