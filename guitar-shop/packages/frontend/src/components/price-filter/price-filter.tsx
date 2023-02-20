import { ChangeEventHandler } from 'react';
import Filter from '../filter/filter';
import { formatPrice } from './utils';

export interface PriceFilterProps {
  min: number | null;
  max: number | null;
  minPlaceholder: number;
  maxPlaceholder: number;
  onChange: (evt: { min: number | null; max: number | null }) => void;
}

export default function PriceFilter(props: PriceFilterProps) {
  const onChangeMin: ChangeEventHandler<HTMLInputElement> = (evt) =>
    props.onChange({
      min: evt.target.value === '' ? null : Number(evt.target.value),
      max: props.max,
    });

  const onChangeMax: ChangeEventHandler<HTMLInputElement> = (evt) =>
    props.onChange({
      min: props.min,
      max: evt.target.value === '' ? null : Number(evt.target.value),
    });

  return (
    <Filter legend="Цена, ₽">
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={formatPrice(props.minPlaceholder)}
            id="priceMin"
            name="от"
            min="0"
            onChange={onChangeMin}
            value={props.min ?? ''}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={formatPrice(props.maxPlaceholder)}
            id="priceMax"
            name="до"
            min="0"
            onChange={onChangeMax}
            value={props.max ?? ''}
          />
        </div>
      </div>
    </Filter>
  );
}
