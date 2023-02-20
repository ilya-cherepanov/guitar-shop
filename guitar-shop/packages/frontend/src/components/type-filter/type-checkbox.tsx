import { ProductType } from '@guitar-shop/shared-types';
import { ProductTypeFilterMap } from '../../constants';


interface TypeCheckboxProps {
  type: ProductType;
  checked: boolean;
  disabled?: boolean;
  onChange: (productType: ProductType) => void;
}


export default function TypeCheckbox({type, checked, disabled, onChange}: TypeCheckboxProps) {
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={type}
        name={type}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(type)}
      />
      <label htmlFor={type}>{ProductTypeFilterMap[type]}</label>
    </div>
  );
}
