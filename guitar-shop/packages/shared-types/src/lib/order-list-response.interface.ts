import { OrderResponse } from "./order-response.interface";

export interface OrderListResponse {
  page: number;
  totalPages: number;
  items: OrderResponse[];
}
