import { useState } from 'react';

interface TextareaInputProps {
  defaultValue?: string;
  name: string;
  label: string;
  triedToSend: boolean;
}

export default function TextareaInput({
  defaultValue,
  name,
  label,
  triedToSend,
}: TextareaInputProps) {
  const [value, setValue] = useState<string | null>(defaultValue ?? null);
  const isInvalid = (value !== null && value === '') || ((value === null || value === '') && triedToSend);

  return (
    <div className={`custom-textarea add-item__form-textarea ${isInvalid ? 'is-invalid' : ''}`}>
      <label>
        <span>{label}</span>
        <textarea
          name={name}
          value={value ?? ''}
          onChange={({ target: { value } }) => setValue(value)}
          required
        ></textarea>
      </label>
      <p>Заполните поле</p>
    </div>
  );
}
