import { useCallback, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatPrice } from '../../components/price-filter/utils';
import Spinner from '../../components/spinner/spinner';
import { LoadingStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneOrder, selectOneOrder, selectOneOrderStatus } from '../../store/slices/one-order-slice';
import { formatDate, formatOrderId } from '../../utils';
import NotFound from '../not-found/not-found';
import OrderItem from './order-item';

export default function Order() {
  const { id } = useParams();
  const order = useAppSelector(selectOneOrder);
  const loadingStatus = useAppSelector(selectOneOrderStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const fetch = useCallback(() => {
    dispatch(fetchOneOrder(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    fetch();
  }, [dispatch, id, fetch]);

  if (loadingStatus === LoadingStatus.Failed) {
    return <NotFound />;
  }

  if (!order) {
    return <Spinner />;
  }

  return (
    <main className="page-content">
      <section className="order">
        <div className="container">
          <h1 className="order__title">Заказ № {formatOrderId(order.id)}</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">
                Каталог
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/order-list">
                {' '}
                Заказы
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Заказ № {formatOrderId(order.id)}</a>
            </li>
          </ul>
          <table className="order-table">
            <tbody>
              <tr>
                <td>Общее количество товаров</td>
                <td>{order.orderItems.reduce((sum, orderItem) => sum + orderItem.quantity, 0)}</td>
              </tr>
              <tr>
                <td>Дата заказа</td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>К оплате</td>
                <td>
                  {formatPrice(order.sumPrice)} <span>₽</span>
                </td>
              </tr>
            </tfoot>
          </table>
          <ul className="order__list order-list">
            {order.orderItems.map((orderItem) => <OrderItem orderId={order.id} orderItem={orderItem} key={orderItem.productId} onDelete={() => fetch()} />)}
          </ul>
          <button className="button order__button button--small button--black-border" type="button" onClick={(evt) => {evt.preventDefault(); navigate('/order-list')}}>
            Вернуться к списку заказов
          </button>
        </div>
      </section>
    </main>
  );
}
