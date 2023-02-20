import { SortByNames } from '../../constants';
import { SortByType } from '../../types/sorting';

interface SortItemProps {
  sortBy: SortByType;
  active: boolean;
  onClick: (sortVariant: SortByType) => void;
}

export default function SortItem({ sortBy, active, onClick }: SortItemProps) {
  return (
    <button
      className={`catalog-sort__type-button ${
        active ? 'catalog-sort__type-button--active' : ''
      }`}
      onClick={() => {
        if (!active) {
          onClick(sortBy);
        }
      }}
      aria-label={SortByNames[sortBy]}
    >
      {SortByNames[sortBy]}
    </button>
  );
}
