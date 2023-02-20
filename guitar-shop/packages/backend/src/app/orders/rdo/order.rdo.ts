import { OrderResponse } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderItemRDO } from './order-item.rdo';


export class OrderRDO implements OrderResponse {
  @ApiProperty({
    description: 'Идентификатор заказа',
    example: 10,
  })
  @Expose()
  id: number;

  @ApiProperty({
    type: OrderItemRDO,
    description: 'Позиции заказа',
    isArray: true,
  })
  @Type(() => OrderItemRDO)
  @Expose()
  orderItems: OrderItemRDO[];

  @ApiProperty({
    description: 'Дата оформления заказа',
    example: '2023-02-13T15:59:54.548Z'
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Сумма заказа',
    example: 15499
  })
  @Expose()
  sumPrice: number;
}
