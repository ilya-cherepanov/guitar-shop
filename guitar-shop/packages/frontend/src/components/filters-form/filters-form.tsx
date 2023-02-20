import { MouseEventHandler } from 'react';


interface FiltersFormProps {
  onReset: () => void;
  children: (JSX.Element | null) | (JSX.Element | null)[]
}


export default function FiltersForm({ onReset, children }: FiltersFormProps): JSX.Element {
  const onResetClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    onReset();
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      {children}
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={onResetClick}
      >
        Очистить
      </button>
    </form>
  );
}
