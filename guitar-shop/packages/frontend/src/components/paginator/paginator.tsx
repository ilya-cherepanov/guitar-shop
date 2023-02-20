import { MouseEvent } from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Paginator({ currentPage, totalPages, onChange }: PaginatorProps) {
  if (totalPages <= 1) {
    return null;
  }

  if (currentPage >= totalPages) {
    onChange(totalPages - 1);
  }

  const handleClick = (evt: MouseEvent<HTMLAnchorElement>, pageNumber: number) => {
    evt.preventDefault();
    onChange(pageNumber);
  };

  const pages: JSX.Element[] = [];
  for (let page = Math.max(0, currentPage - 2); page < Math.min(currentPage + 3, totalPages); ++page) {
    pages.push(
      <li key={page} className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`}>
        <a className="link pagination__page-link" href={`${page}`} onClick={(evt) => handleClick(evt, page)}>{page + 1}</a>
      </li>
    );
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage > 0 && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <a className="link pagination__page-link" href={`${currentPage - 1}`} onClick={(evt) => handleClick(evt, currentPage - 1)}>Назад</a>
          </li>
        )}
        {pages}
        {currentPage < (totalPages - 1) && (
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link" href={`${currentPage + 1}`} onClick={(evt) => handleClick(evt, currentPage + 1)}>Далее</a>
          </li>
        )}
      </ul>
    </div>
  );
}
