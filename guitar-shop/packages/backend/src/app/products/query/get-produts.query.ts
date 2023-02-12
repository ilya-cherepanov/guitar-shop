import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { NumberOfStringsType, ProductType, SortOrder } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayUnique, isArray, IsEnum, IsIn, IsInt, IsNumber, isNumberString, IsOptional, Max, Min } from 'class-validator';
import { ProductPrice } from '../../constants';


export class GetProductsQuery {
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
    description: 'Тип товара',
    example: [ProductType.Acoustic, ProductType.Ukulele],
    isArray: true,
    required: false,
    default: [],
    enum: ProductType
  })
  @IsEnum(ProductType, {each: true})
  @ArrayUnique()
  @Transform(({value: values}) => {
    if (isArray(values)) {
      return values;
    }

    if (values) {
      return [`${values}`];
    }

    return [];
  })
  @IsOptional()
  productTypes: ProductType[] = [];

  @ApiProperty({
    description: 'Количество струн',
    example: [4, 6],
    required: false,
    isArray: true,
    default: [],
    enum: NUMBER_OF_STRINGS
  })
  @IsIn(NUMBER_OF_STRINGS, {each: true})
  @ArrayUnique()
  @IsOptional()
  @Transform(({value: values}) => {
    if (isArray(values)) {
      return values.map((value) => Number(value));
    }

    if (isNumberString(values)) {
      return [Number(values)];
    }

    return [];
  })
  numbersOfStrings: NumberOfStringsType[] = [];

  @ApiProperty({
    description: 'Минимальная цена',
    example: 10000,
    required: false,
    default: ProductPrice.Min
  })
  @Max(ProductPrice.Max)
  @Min(ProductPrice.Min)
  @IsNumber()
  @IsOptional()
  @Transform(({value}) => parseInt(value) || ProductPrice.Min)
  minPrice: number = ProductPrice.Min;

  @ApiProperty({
    description: 'Максимальная цена',
    example: 25000,
    required: false,
    default: ProductPrice.Max
  })
  @Max(ProductPrice.Max)
  @Min(ProductPrice.Min)
  @IsNumber()
  @IsOptional()
  @Transform(({value}) => parseInt(value) || ProductPrice.Max)
  maxPrice: number = ProductPrice.Max;

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
    description: 'Отсортировать по цене',
    enum: SortOrder,
    example: SortOrder.Descending,
    required: false,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortByRating?: SortOrder;

  @ApiProperty({
    description: 'Отсортировать по цене',
    enum: SortOrder,
    example: SortOrder.Descending,
    default: SortOrder.Descending,
    required: false,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortByAdding?: SortOrder = SortOrder.Descending;
}
