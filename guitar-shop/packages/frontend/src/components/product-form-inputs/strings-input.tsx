import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { NumberOfStringsType } from '@guitar-shop/shared-types';
import React from 'react';

interface StringsInputProps {
  defaultValue?: NumberOfStringsType;
}

export default function StringsInput({defaultValue = 4}: StringsInputProps) {
  const radioInputs = NUMBER_OF_STRINGS.map((strings) => (
    <React.Fragment key={strings}>
      <input type="radio" id={`string-qty-${strings}`} name="numberOfStrings" value={strings} defaultChecked={defaultValue === strings}/>
      <label htmlFor={`string-qty-${strings}`}>{strings}</label>
    </React.Fragment>
  ));

  return (
    <div className="input-radio add-item__form-radio">
      <span>Количество струн</span>
      {radioInputs}
    </div>
  );
}
