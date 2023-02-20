import { SortOrder } from './sort-order.enum';

export interface OrdersQueryParams {
  page: number;
  sortByPrice?: SortOrder;
  sortByAdding?: SortOrder;
}
