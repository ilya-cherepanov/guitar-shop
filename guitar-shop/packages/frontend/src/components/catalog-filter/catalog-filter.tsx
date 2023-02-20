import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';
import { useEffect, useState } from 'react';
import { FILTER_CHANGE_DELAY } from '../../constants';
import { CatalogFiltersType } from '../../types/filters';
import FiltersForm from '../filters-form/filters-form';
import PriceFilter from '../price-filter/price-filter';
import StringsFilter from '../strings-filter/strings-filter';
import TypeFilter from '../type-filter/type-filter';


interface CatalogFiltersProps {
  minPlaceholder: number;
  maxPlaceholder: number;
  includePrice?: boolean;
  onChange: (filterData: CatalogFiltersType) => void;
}

export default function CatalogFilters({minPlaceholder, maxPlaceholder, onChange, includePrice = true}: CatalogFiltersProps) {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [checkedStrings, setCheckedString] = useState<NumberOfStringsType[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<ProductType[]>([]);

  useEffect(() => {
    const timerId = setTimeout(() => onChange({
      minPrice,
      maxPrice,
      checkedStrings,
      checkedTypes,
    }), FILTER_CHANGE_DELAY);

    return () => { clearTimeout(timerId); };
  }, [minPrice, maxPrice, checkedStrings, checkedTypes, onChange]);

  const resetHandler = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setCheckedString([]);
    setCheckedTypes([]);
  };

  const handlePriceChange = (evt: {min: number | null, max: number | null}) => {
    setMinPrice(evt.min);
    setMaxPrice(evt.max);
  }

  return (
    <FiltersForm onReset={resetHandler}>
      {includePrice ? <PriceFilter min={minPrice} max={maxPrice} maxPlaceholder={maxPlaceholder} minPlaceholder={minPlaceholder} onChange={handlePriceChange} /> : null}
      <TypeFilter checkedStrings={checkedStrings} checkedTypes={checkedTypes} onChange={(types) => setCheckedTypes(types)} />
      <StringsFilter checkedStrings={checkedStrings} checkedTypes={checkedTypes} onChange={(strings) => setCheckedString(strings)} />
    </FiltersForm>
  );
}
