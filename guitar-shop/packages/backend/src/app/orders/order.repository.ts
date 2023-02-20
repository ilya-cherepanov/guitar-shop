import { Order, SortOrder } from '@guitar-shop/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PRISMA_NOT_FOUND_CODE } from '../constants';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './entities/order.entity';


@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(orderId: number): Promise<Order | null> {
    const existingOrder = await this.prismaService.order.findFirst({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!existingOrder) {
      return null;
    }

    return {
      ...existingOrder,
      orderItems: existingOrder.orderItems.map((orderItem) => ({
        ...orderItem,
        sumPrice: orderItem.sumPrice.toNumber(),
        product: {...orderItem.product, price: orderItem.product.price.toNumber()},
      })),
      sumPrice: existingOrder.sumPrice.toNumber()
    };
  }

  public async getOrdersCount(): Promise<number> {
    return this.prismaService.order.count();
  }

  public async findMany(skip: number, quantity: number, sorting: {sortByPrice?: SortOrder, sortByDate?: SortOrder}): Promise<Order[]> {
    const query = {
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      skip,
      take: quantity,
    };

    const orderBy = [];
    if (sorting.sortByPrice) {
      orderBy.push({ sumPrice: sorting.sortByPrice });
    } else if (sorting.sortByDate) {
      orderBy.push({ createdAt: sorting.sortByDate });
    } else {
      orderBy.push({ createAt: 'desc' });
    }

    const orders = await this.prismaService.order.findMany({
      ...query,
      orderBy,
    });

    return orders.map((order) => ({
      ...order,
      orderItems: order.orderItems.map((orderItem) => ({
        ...orderItem,
        sumPrice: orderItem.sumPrice.toNumber(),
        product: {...orderItem.product, price: orderItem.product.price.toNumber()}
      })),
      sumPrice: order.sumPrice.toNumber(),
    }));
  }

  public async create(orderEntity: OrderEntity): Promise<Order> {
    const newOrder = await this.prismaService.order.create({
      data: {
        customerId: orderEntity.customerId,
        sumPrice: orderEntity.sumPrice,
        orderItems: {
          createMany: {data: orderEntity.orderItems},
        },
      },
      include: {
        orderItems: true,
      },
    });

    return {
      ...newOrder,
      orderItems: newOrder.orderItems.map((orderItem) => ({
        ...orderItem,
        sumPrice: orderItem.sumPrice.toNumber()
      })),
      sumPrice: newOrder.sumPrice.toNumber()
    };
  }

  public async delete(orderId: number): Promise<void> {
    try {
      await this.prismaService.order.delete({where: {id: orderId}});
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError
          && err.code === PRISMA_NOT_FOUND_CODE) {
        throw new NotFoundException();
      } else {
        throw err;
      }
    }
  }

  public async deleteOrderItem(orderId: number, productId: number): Promise<void> {
    try {
      await this.prismaService.orderItem.delete({where: {orderId_productId: {
        orderId,
        productId,
      }}});
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError
        && err.code === PRISMA_NOT_FOUND_CODE) {
          throw new NotFoundException();
        } else {
          throw err;
        }
    }
  }
}
