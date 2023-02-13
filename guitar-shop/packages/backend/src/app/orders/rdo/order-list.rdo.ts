import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderRDO } from './order.rdo';


export class OrderListRDO {
  @ApiProperty({
    description: 'Номер текущей страницы',
    example: 2,
  })
  @Expose()
  page: number;

  @ApiProperty({
    description: 'Всего страниц с заказами',
    example: 14,
  })
  @Expose()
  totalPages: number;

  @ApiProperty({
    description: 'Заказы',
    type: OrderRDO,
    isArray: true,
  })
  @Expose()
  @Type(() => OrderRDO)
  items: OrderRDO[];
}
