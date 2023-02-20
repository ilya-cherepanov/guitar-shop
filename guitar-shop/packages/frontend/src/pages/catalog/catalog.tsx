import { SortOrder } from '@guitar-shop/shared-types';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CatalogFilters from '../../components/catalog-filter/catalog-filter';
import Paginator from '../../components/paginator/paginator';
import ProductCard from '../../components/product-card/product-card';
import Sorter from '../../components/sorter/sorter';
import { LoadingStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchProducts,
  selectLoadingStatus,
  selectPage,
  selectProducts,
  selectProductsPrice,
} from '../../store/slices/products-slice';
import { CatalogFiltersType } from '../../types/filters';
import { SortByType } from '../../types/sorting';

export default function Catalog() {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const pageInfo = useAppSelector(selectPage);
  const products = useAppSelector(selectProducts);
  const priceInfo = useAppSelector(selectProductsPrice);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<[SortByType, SortOrder] | null>(null);
  const [filters, setFilters] = useState<CatalogFiltersType>({
    minPrice: null,
    maxPrice: null,
    checkedStrings: [],
    checkedTypes: [],
  });

  const fetch = useCallback(async () => {
    const query: Parameters<typeof fetchProducts>[0] = {
      page: String(page),
    };
    query.numbersOfStrings = filters.checkedStrings.map((strings) => String(strings));
    query.productTypes = filters.checkedTypes;
    if (orderBy) {
      query[orderBy[0]] = orderBy[1];
    }
    if (filters.maxPrice) {
      query.maxPrice = String(filters.maxPrice);
    }
    if (filters.minPrice) {
      query.minPrice = String(filters.minPrice);
    }

    await dispatch(fetchProducts(query)).unwrap();
  }, [page, dispatch, filters, orderBy])

  useEffect(() => {
    fetch();
  }, [dispatch, page, fetch]);

  const handleFilterChange = useCallback((filters: CatalogFiltersType) => {
    setFilters(filters);
  }, []);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">
          Каталог гитар
        </h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to="/">
              Главная
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">
              Каталог
            </Link>
          </li>
        </ul>
        <div className="catalog">
          <CatalogFilters maxPlaceholder={priceInfo.maxPrice} minPlaceholder={priceInfo.minPrice} onChange={handleFilterChange} />
          <Sorter sortingElements={['sortByPrice', 'sortByRating']} currentSorting={orderBy} onChange={(variant, sortOrder) => setOrderBy([variant, sortOrder])} />
          <div className="cards catalog__cards">
            {loadingStatus === LoadingStatus.Succeeded &&
              products?.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
          {loadingStatus === LoadingStatus.Succeeded && (
            <Paginator
              currentPage={pageInfo.currentPage}
              totalPages={pageInfo.totalPages}
              onChange={(newPage) => setPage(newPage)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
