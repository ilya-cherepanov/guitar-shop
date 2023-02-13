import { OrderItem } from './order-item.interface';


export interface Order {
  id?: number;
  createdAt?: Date;
  customerId: number;
  sumPrice: number;
  orderItems: OrderItem[];
}
