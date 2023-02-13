import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class OrderItemRDO {
  @ApiProperty({
    description: 'Идентификатор товара',
    example: 152
  })
  @Expose()
  productId: number;

  @ApiProperty({
    description: 'Количество товара',
    example: 2,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    description: 'Сумма заказа',
    example: 15499
  })
  @Expose()
  sumPrice: number;
}
