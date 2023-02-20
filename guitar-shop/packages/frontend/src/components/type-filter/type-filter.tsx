import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';
import { StringsToProductTypeRestrictions } from '../../constants';
import Filter from '../filter/filter';
import TypeCheckbox from './type-checkbox';


interface TypeFilterProps {
  checkedTypes: ProductType[];
  checkedStrings: NumberOfStringsType[];
  onChange: (checkedTypes: ProductType[]) => void;
}


function getActiveTypes(checkedStrings: NumberOfStringsType[]): ProductType[] {
  if (checkedStrings.length <= 0) {
    return [ProductType.Acoustic, ProductType.Electric, ProductType.Ukulele];
  }

  const validTypes = new Set(checkedStrings.reduce((arr: ProductType[], strings) => (
    [...arr, ...StringsToProductTypeRestrictions[strings]]
  ), []));

  return [...validTypes];
}

function getValidTypes(checkedTypes: ProductType[], activeTypes: ProductType[]): ProductType[] {
  return checkedTypes.filter((type) => activeTypes.includes(type));
}

export default function TypeFilter({checkedTypes, checkedStrings, onChange}: TypeFilterProps): JSX.Element {
  const filters: ProductType[] = [ProductType.Acoustic, ProductType.Electric, ProductType.Ukulele];
  const activeTypes = getActiveTypes(checkedStrings);
  const validTypes = getValidTypes(checkedTypes, activeTypes);
  if (validTypes.length < checkedTypes.length) {
    onChange(validTypes);
  }

  const handleChange = (productType: ProductType) => {
    if (checkedTypes.includes(productType)) {
      onChange(checkedTypes.filter((type) => type !== productType));
    } else {
      onChange([...checkedTypes, productType]);
    }
  }

  const typeCheckboxes = filters.map((filter) => (
    <TypeCheckbox
      key={filter}
      type={filter}
      checked={checkedTypes.includes(filter)}
      disabled={!activeTypes.includes(filter)}
      onChange={handleChange}
    />
  ));

  return (
    <Filter legend="Тип гитар">{typeCheckboxes}</Filter>
  );
}
