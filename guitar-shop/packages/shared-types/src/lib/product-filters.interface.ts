import { ProductType } from './product-type.enum';
import { NumberOfStringsType } from './product.interface';

export interface ProductFilters {
  productTypes: ProductType[],
  numbersOfString: NumberOfStringsType[],
}
