import { SortOrder } from '@guitar-shop/shared-types';
import { MouseEventHandler } from 'react';
import { SortByType } from '../../types/sorting';
import SortItem from './sort-item';

interface SorterProps {
  sortingElements: SortByType[];
  currentSorting: [SortByType, SortOrder] | null;
  onChange: (sortVariant: SortByType, sortOrder: SortOrder) => void;
}

export default function Sorter({
  sortingElements,
  currentSorting,
  onChange
}: SorterProps) {

  const handleSortItemClick = (variant: SortByType) => {
    if (currentSorting) {
      const sortOrderToSet = currentSorting[1] === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
      onChange(variant, variant !== currentSorting[0] ? currentSorting[1] : sortOrderToSet);
      return;
    }

    onChange(variant, SortOrder.Descending);
  }

  const sortButtons = sortingElements.map((sortingElement) => (
    <SortItem
      active={sortingElement === currentSorting?.[0]}
      sortBy={sortingElement}
      onClick={handleSortItemClick}
      key={sortingElement}
    />
  ));

  const handleAscClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    if (!currentSorting) {
      onChange(sortingElements[0], SortOrder.Ascending);
      return;
    }

    onChange(
      currentSorting[0],
      currentSorting[1] !== SortOrder.Ascending ? SortOrder.Ascending : SortOrder.Descending
    );
  };

  const handleDescClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    if (!currentSorting) {
      onChange(sortingElements[0], SortOrder.Descending);
      return;
    }

    onChange(
      currentSorting[0],
      currentSorting[1] !== SortOrder.Descending ? SortOrder.Descending : SortOrder.Ascending
    );
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">{sortButtons}</div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${
            currentSorting && currentSorting[1] === SortOrder.Ascending
              ? 'catalog-sort__order-button--active'
              : ''
          }`}
          aria-label="По возрастанию"
          type="button"
          onClick={handleAscClick}
        ></button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${
            currentSorting && currentSorting[1] === SortOrder.Descending
              ? 'catalog-sort__order-button--active'
              : ''
          }`}
          aria-label="По убыванию"
          type="button"
          onClick={handleDescClick}
        ></button>
      </div>
    </div>
  );
}
