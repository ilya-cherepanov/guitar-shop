import { SortOrder } from '@guitar-shop/shared-types';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CatalogFilters from '../../components/catalog-filter/catalog-filter';
import Paginator from '../../components/paginator/paginator';
import Sorter from '../../components/sorter/sorter';
import Spinner from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProducts, selectPage, selectProducts, selectProductsPrice } from '../../store/slices/products-slice';
import { CatalogFiltersType } from '../../types/filters';
import { ProductQueryType } from '../../types/product-query';
import { SortByType } from '../../types/sorting';
import ProductListItem from './product-list-item';

export default function ProductList() {
  const navigate = useNavigate();
  const products = useAppSelector(selectProducts);
  const { totalPages } = useAppSelector(selectPage);
  const prices = useAppSelector(selectProductsPrice);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<[SortByType, SortOrder] | null>(null);
  const [filters, setFilters] = useState<CatalogFiltersType>({
    minPrice: null,
    maxPrice: null,
    checkedStrings: [],
    checkedTypes: [],
  });


  const fetch = useCallback(async () => {
    const query: ProductQueryType = {
      page: String(page),
    };
    query.numbersOfStrings = filters.checkedStrings.map((strings) => String(strings));
    query.productTypes = filters.checkedTypes;
    if (orderBy) {
      query[orderBy[0]] = orderBy[1];
    }
    await dispatch(fetchProducts(query)).unwrap();
  }, [page, dispatch, filters, orderBy])


  useEffect(() => {
    fetch();
  }, [dispatch, page, fetch]);

  const handleFilterChange = useCallback((filters: CatalogFiltersType) => {
    setFilters(filters);
  }, []);

  const handleAddProductButton: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    navigate('/product-list/add');
  };

  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">
                Каталог
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Товары</a>
            </li>
          </ul>
          <div className="catalog">
            <CatalogFilters includePrice={false} onChange={handleFilterChange} minPlaceholder={prices.minPrice} maxPlaceholder={prices.maxPrice} />
            <Sorter sortingElements={['sortByAdding', 'sortByPrice', 'sortByRating']} onChange={(variant, sortOrder) => setOrderBy([variant, sortOrder])} currentSorting={orderBy} />
            <div className="catalog-cards">
              <ul className="catalog-cards__list">
                {products === null ? (
                  <Spinner />
                ) : (
                  products.map((product) => (
                    <li className="catalog-item" key={product.id}>
                      <ProductListItem product={product} onDelete={() => fetch()} />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <button
            className="button product-list__button button--red button--big"
            type="button"
            onClick={handleAddProductButton}
          >
            Добавить новый товар
          </button>
          <Paginator currentPage={page} totalPages={totalPages} onChange={(newPage) => setPage(newPage)} />
        </div>
      </section>
    </main>
  );
}
