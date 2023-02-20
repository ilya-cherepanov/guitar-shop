import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';


class ProductRDO {
  @ApiProperty({
    description: 'Идентификатор товара',
    example: 412,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Название товара',
    example: 'СURT Z30 PLUS',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Тип товара',
    example: ProductType.Electric,
    enum: ProductType,
  })
  @Expose()
  type: ProductType;

  @ApiProperty({
    description: 'Артикул товара',
    example: 'SO754565',
  })
  @Expose()
  article: string;

  @ApiProperty({
    description: 'Количество струн',
    enum: NUMBER_OF_STRINGS,
    example: NUMBER_OF_STRINGS[1],
  })
  @Expose()
  numberOfStrings: NumberOfStringsType;

  @ApiProperty({
    description: 'Цена товара',
    example: 52000,
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Фотография товара',
    example: '0c5b335b-f157-422f-a5b5-ca8bc17dfd46.png'
  })
  @Expose()
  photo: string;
}


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

  @ApiProperty({
    description: 'Краткая информация о товаре',
    type: ProductRDO,
  })
  @Expose()
  @Type(() => ProductRDO)
  product: ProductRDO;
}
