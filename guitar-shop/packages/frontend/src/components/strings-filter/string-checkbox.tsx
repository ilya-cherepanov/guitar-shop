import { NumberOfStringsType } from '@guitar-shop/shared-types';


interface StringCheckboxProps {
  stringsNumber: NumberOfStringsType;
  checked: boolean;
  disabled?: boolean;
  onChange: (stringsNumber: NumberOfStringsType) => void;
}


export default function StringCheckbox({stringsNumber, checked, onChange, disabled = false}: StringCheckboxProps): JSX.Element {
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={`${stringsNumber}-strings`}
        name={`${stringsNumber}-strings`}
        onChange={() => onChange(stringsNumber)}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={`${stringsNumber}-strings`}>{stringsNumber}</label>
    </div>
  );
}
