import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';


export interface ProductFilters {
  productTypes: ProductType[],
  numbersOfString: NumberOfStringsType[],
}
