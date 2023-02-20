import { ProductType } from '@guitar-shop/shared-types';
import React from 'react';
import { ProductTypeTranslation } from '../../constants';


interface TypesInputProps {
  defaultValue?: ProductType;
}


export default function TypesInput({defaultValue = ProductType.Acoustic}: TypesInputProps) {
  const typeOrder = [ProductType.Acoustic, ProductType.Electric, ProductType.Ukulele];

  const radioInputs = typeOrder.map((typeOrderItem) => (
    <React.Fragment key={typeOrderItem}>
      <input type="radio" id={typeOrderItem} name="type" value={typeOrderItem} defaultChecked={typeOrderItem === defaultValue}/>
      <label htmlFor={typeOrderItem}>{ProductTypeTranslation[typeOrderItem]}</label>
    </React.Fragment>
  ));

  return (
    <div className="input-radio add-item__form-radio">
      <span>Выберите тип товара</span>
      {radioInputs}
    </div>
  );
}
