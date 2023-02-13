import { SortOrder } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';


export class GetOrdersQuery {
  @ApiProperty({
    description: 'Страница загрузки товаров',
    default: 0,
    example: 1,
    required: false,
  })
  @Transform(({value}) => parseInt(value) || 0)
  @Min(0)
  @IsInt()
  @IsOptional()
  page = 0;

  @ApiProperty({
    description: 'Отсортировать по цене',
    enum: SortOrder,
    example: SortOrder.Descending,
    required: false,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortByPrice?: SortOrder;

  @ApiProperty({
    description: 'Отсортировать по дате заказа',
    enum: SortOrder,
    example: SortOrder.Descending,
    default: SortOrder.Descending,
    required: false,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortByAdding?: SortOrder = SortOrder.Descending;
}
