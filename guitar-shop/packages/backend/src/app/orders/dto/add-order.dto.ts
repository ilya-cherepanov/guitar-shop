import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayUnique, IsArray, IsInt, Min, ValidateNested } from 'class-validator';


class OrderItem {
  @ApiProperty({
    description: 'ID товара',
    example: 52,
  })
  @Min(0)
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'Количество товаров',
    example: 1,
  })
  @Min(0)
  @IsInt()
  quantity: number;
}


export class AddOrderDTO {
  @ApiProperty({
    description: 'Позиции заказа',
    type: Array<OrderItem>,
    example: {
      items: [
        {
          productId: 20,
          quantity: 1,
        },
        {
          productId: 252,
          quantity: 1,
        }
      ],
    }
  })
  @ArrayUnique((value) => value.productId)
  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OrderItem)
  items: OrderItem[];
}
