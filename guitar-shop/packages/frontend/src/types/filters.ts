import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';


export interface CatalogFiltersType {
  maxPrice: number | null;
  minPrice: number | null;
  checkedStrings: NumberOfStringsType[];
  checkedTypes: ProductType[];
}

export interface ProductListFilters {
  checkedStrings: NumberOfStringsType[];
  checkedTypes: ProductType[];
}
