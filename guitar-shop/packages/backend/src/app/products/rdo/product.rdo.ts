import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { NumberOfStringsType, ProductResponse, ProductType } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';


export class ProductRDO implements ProductResponse {
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
    description: 'Описание товара',
    example: 'Электрогитара, инструмент в корпусе черного матового цвета. Выполнен из тополя, гриф из клена и амаранта. Модель имеет 24 лада, 5-позиционный переключатель, два звукоснимателя.',
  })
  @Expose()
  description: string;

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
    description: 'Дата добавления товара',
    example: '2023-02-09T14:43:11.000Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Фотография товара',
    example: '0c5b335b-f157-422f-a5b5-ca8bc17dfd46.png'
  })
  @Expose()
  photo: string;

  @ApiProperty({
    description: 'Рейтинг товара',
    example: 4.2
  })
  @Expose()
  avgRating: number;

  @ApiProperty({
    description: 'Количество комментариев',
    example: 11,
  })
  @Transform((value) => value.obj._count.comments)
  @Expose()
  commentsCount: number;
}
