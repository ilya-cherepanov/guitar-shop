import { Order, OrderItem } from '@guitar-shop/shared-types';


export class OrderEntity implements Order {
  id?: number;
  createdAt: Date;
  customerId: number;
  orderItems: OrderItem[];
  sumPrice: number;

  get priceSum() {
    return this.orderItems.reduce((sum, orderItem) => sum + orderItem.sumPrice, 0);
  }

  constructor(order: Order) {
    this.fillEntity(order);
  }

  public fillEntity(order: Order) {
    this.id = order.id;
    this.createdAt = order.createdAt;
    this.customerId = order.customerId;
    this.sumPrice = order.sumPrice;
    this.orderItems = order.orderItems.map((orderItem) => ({...orderItem}));
  }
}
