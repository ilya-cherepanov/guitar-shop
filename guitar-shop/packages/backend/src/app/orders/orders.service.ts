import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderItem } from '@guitar-shop/shared-types';
import { isEmpty } from 'lodash';
import { ProductRepository } from '../products/product.repository';
import { AddOrderDTO } from './dto/add-order.dto';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './entities/order.entity';
import { GetOrdersQuery } from './query/get-orders.query';
import { ORDERS_PER_PAGE, ORDER_NOT_FOUND, PRODUCT_NOT_FOUND } from '../constants';
import { MailService } from '../mail/mail.service';


@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly mailService: MailService,
  ) {}

  async create(dto: AddOrderDTO, userId: number) {
    const productIds = dto.items.map((orderItem) => orderItem.productId);
    const products = await this.productRepository.findByMultipleIds(productIds);

    if (productIds.length > 0 && (isEmpty(products)
      || Object.keys(products).length !== productIds.length)) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    const orderItems: OrderItem[] = dto.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      sumPrice: item.quantity * products[item.productId].price,
    }));

    const orderEntity = new OrderEntity({
      orderItems: orderItems,
      sumPrice: orderItems.reduce((sum, orderItem) => sum + orderItem.sumPrice, 0),
      customerId: userId,
    });


    const newOrder = await this.orderRepository.create(orderEntity);

    await this.mailService.setOrderNotification(newOrder.id);

    return newOrder;
  }

  async getOne(orderId) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }

    return existingOrder;
  }

  async getMany(query: GetOrdersQuery) {
    const skip = query.page * ORDERS_PER_PAGE;

    const orders = await this.orderRepository.findMany(skip, ORDERS_PER_PAGE, {
      sortByDate: query.sortByAdding,
      sortByPrice: query.sortByPrice,
    });

    const ordersCount = await this.orderRepository.getOrdersCount();
    const totalPages = Math.ceil(ordersCount / ORDERS_PER_PAGE);

    return {
      page: query.page,
      totalPages,
      items: orders,
    };
  }

  async delete(orderId: number) {
    await this.orderRepository.delete(orderId);
  }

  async deleteOrderItem(orderId: number, productId: number) {
    await this.orderRepository.deleteOrderItem(orderId, productId);
  }
}
