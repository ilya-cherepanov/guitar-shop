export interface CreateOrderRequest {
  items: {
    productId: number;
    quantity: number;
  }[];
}
