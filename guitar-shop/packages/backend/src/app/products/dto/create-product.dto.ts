import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsIn, IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { ProductArticle, ProductDescription, ProductPrice, ProductTitle } from '../../constants';


export class CreateProductDTO {
  @ApiProperty({
    description: 'Название товара',
    example: 'СURT Z30 PLUS',
  })
  @Length(ProductTitle.MinLength, ProductTitle.MaxLength)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Описание товара',
    example: 'Электрогитара, инструмент в корпусе черного матового цвета. Выполнен из тополя, гриф из клена и амаранта. Модель имеет 24 лада, 5-позиционный переключатель, два звукоснимателя.',
  })
  @Length(ProductDescription.MinLength, ProductDescription.MaxLength)
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Тип товара',
    example: ProductType.Electric,
    enum: ProductType,
  })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({
    description: 'Артикул товара',
    example: 'SO754565',
  })
  @Length(ProductArticle.MinLength, ProductArticle.MaxLength)
  @IsString()
  article: string;

  @ApiProperty({
    description: 'Количество струн',
    enum: NUMBER_OF_STRINGS,
    example: NUMBER_OF_STRINGS[1],
  })
  @IsIn(NUMBER_OF_STRINGS)
  @IsInt()
  @Transform(({value}) => Number(value))
  @IsNumber()
  numberOfStrings: NumberOfStringsType;

  @ApiProperty({
    description: 'Цена товара',
    example: 52000,
  })
  @Max(ProductPrice.Max)
  @Min(ProductPrice.Min)
  @Transform(({value}) => Number(value))
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Дата добавления товара',
    example: '2023-02-09T14:43:11.000Z',
  })
  @IsDate()
  @Transform(({value}) => new Date(value))
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Фотография товара'
  })
  photo: unknown;
}
