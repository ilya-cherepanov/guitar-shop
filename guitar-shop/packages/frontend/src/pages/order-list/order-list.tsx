import { SortOrder } from '@guitar-shop/shared-types';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/paginator/paginator';
import Sorter from '../../components/sorter/sorter';
import Spinner from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOrders, selectOrders, selectOrdersPage } from '../../store/slices/orders-slice';
import { SortByType } from '../../types/sorting';
import OrderListItem from './order-list-item';


export default function OrderList() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(selectOrders);
  const {totalPages} = useAppSelector(selectOrdersPage);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<[SortByType, SortOrder] | null>(null);

  const fetch = useCallback(async () => {
    const query: Parameters<typeof fetchOrders>[0] = {
      page: String(page),
    };
    if (orderBy && orderBy[0] !== 'sortByRating') {
      query[orderBy[0]] = orderBy[1];
    }
    dispatch(fetchOrders(query));
  }, [page, dispatch, orderBy]);

  useEffect(() => {
    fetch();
  }, [dispatch, page, fetch]);

  if (!orders) {
    return <Spinner />;
  }

  return (
    <main className="page-content orders__main">
      <section className="orders">
        <div className="container">
          <h1 className="title title--bigger orders__title">Список заказов</h1>
          <ul className="breadcrumbs orders__breadcrumps">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">
                Каталог
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="#">
                {' '}
                Заказы
              </a>
            </li>
          </ul>
          <Sorter sortingElements={['sortByAdding', 'sortByPrice']} currentSorting={orderBy} onChange={(variant, sortOrder) => setOrderBy([variant, sortOrder])} />
          <ul className="orders__list">
            {orders.map((order) => <OrderListItem key={order.id} order={order} onDelete={() => fetch()} />)}
          </ul>
          <Paginator currentPage={page} totalPages={totalPages} onChange={(newPage) => setPage(newPage)} />
        </div>
      </section>
    </main>
  );
}
