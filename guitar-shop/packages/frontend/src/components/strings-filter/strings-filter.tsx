import Filter from '../filter/filter';
import StringCheckbox from './string-checkbox';
import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';
import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { ProductTypeToStringsRestrictions } from '../../constants';

export interface StringsFilterProps {
  checkedStrings: NumberOfStringsType[],
  checkedTypes: ProductType[],
  onChange: (checkedStrings: NumberOfStringsType[]) => void,
}


function getActiveStrings(checkedTypes: ProductType[]): NumberOfStringsType[] {
  if (checkedTypes.length <= 0) {
    return [...NUMBER_OF_STRINGS];
  }

  const validStrings = new Set(checkedTypes.reduce((arr: NumberOfStringsType[], type) => (
    [...arr, ...ProductTypeToStringsRestrictions[type]]
  ), []));

  return [...validStrings];
}

function getValidStrings(checkedStrings: NumberOfStringsType[], activeStrings: NumberOfStringsType[]): NumberOfStringsType[] {
  return checkedStrings.filter((strings) => activeStrings.includes(strings));
}

export default function StringsFilter({checkedStrings, checkedTypes, onChange}: StringsFilterProps): JSX.Element {
  const activeStrings = getActiveStrings(checkedTypes);
  const validStrings = getValidStrings(checkedStrings, activeStrings);
  if (validStrings.length < checkedStrings.length) {
    onChange(validStrings);
  }

  const handleChange = (stringsNumber: NumberOfStringsType) => {
    if (checkedStrings.includes(stringsNumber)) {
      onChange(checkedStrings.filter((strings) => strings !== stringsNumber));
    } else {
      onChange([...checkedStrings, stringsNumber]);
    }
  };

  const stringCheckboxes = NUMBER_OF_STRINGS.map((strings) => (
    <StringCheckbox
      key={strings}
      onChange={handleChange}
      stringsNumber={strings}
      checked={checkedStrings.includes(strings)}
      disabled={!activeStrings.includes(strings)}
    />
  ));

  return <Filter legend="Количество струн">{stringCheckboxes}</Filter>;
}
