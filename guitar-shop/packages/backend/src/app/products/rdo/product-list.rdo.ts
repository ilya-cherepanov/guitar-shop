import { ProductListResponse } from '@guitar-shop/shared-types';
import { Expose, Type } from 'class-transformer';
import { ProductRDO } from './product.rdo';


export class ProductListRDO implements ProductListResponse {
  @Expose()
  currentPage: number;

  @Expose()
  totalPages: number;

  @Expose()
  minPrice: number;

  @Expose()
  maxPrice: number;

  @Expose()
  @Type(() => ProductRDO)
  items: ProductRDO[];
}
