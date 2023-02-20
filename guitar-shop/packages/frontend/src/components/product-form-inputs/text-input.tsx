import { useState } from 'react';

interface TextInputProps {
  defaultValue?: string;
  label: string;
  name: string;
  placeholder: string;
  additionalClasses?: string[];
  triedToSend: boolean;
}

export default function TextInput({
  defaultValue,
  placeholder,
  label,
  name,
  additionalClasses = [],
  triedToSend,
}: TextInputProps) {
  const [value, setValue] = useState<string | null>(defaultValue ?? null);
  const isInvalid = (value !== null && value === '') || ((value === null || value === '') && triedToSend);

  return (
    <div
      className={`custom-input add-item__form-input ${additionalClasses.join(
        ' '
      )} ${isInvalid ? 'is-invalid' : ''}`}
    >
      <label>
        <span>{label}</span>
        <input
          type="text"
          name={name}
          value={value ?? ''}
          onChange={({ target: { value } }) => setValue(value)}
          placeholder={placeholder}
          required
        />
      </label>
      <p>Заполните поле</p>
    </div>
  );
}
