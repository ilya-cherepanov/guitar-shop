import { OrderItem } from '@guitar-shop/shared-types';


export class OrderItemEntity implements OrderItem {
  orderId?: number;
  productId: number;
  quantity: number;
  sumPrice: number;

  constructor(orderItem: OrderItem) {
    this.fillEntity(orderItem);
  }

  public fillEntity(orderItem: OrderItem): void {
    this.orderId = orderItem.orderId;
    this.productId = orderItem.productId;
    this.quantity = orderItem.quantity;
    this.sumPrice = orderItem.sumPrice;
  }
}
