import React, { ChangeEventHandler } from 'react';
import { RatePlural } from '../../constants';

interface StarsInputProps {
  onChange: (rating: number) => void;
  value: number | null;
}

export default function StarsInput({ onChange, value }: StarsInputProps) {
  const stars: JSX.Element[] = [];

  const handleClick: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const target = evt.target as HTMLInputElement;
    onChange(Number(target.value));
  }

  for (let i = 5; i >= 1; --i) {
    stars.push(
      <React.Fragment key={i}>
        <input
          className="visually-hidden"
          id={`star-${i}`}
          name="rate"
          type="radio"
          value={i}
          onChange={handleClick}
          checked={value === i}
        />
        <label className="rate__label" htmlFor={`star-${i}`} title={RatePlural[i as 1 | 2 | 3 | 4 | 5]}></label>
      </React.Fragment>
    );
  }

  return (
    <div className="rate rate--reverse">
      {stars}
      <p className="rate__message" style={{visibility: value === null || value === 0 ? 'visible' : 'hidden'}}>Поставьте оценку</p>
    </div>
  );
}
