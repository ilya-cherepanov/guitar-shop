import { OrderResponse } from '@guitar-shop/shared-types';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../components/price-filter/utils';
import { useAppDispatch } from '../../hooks';
import { deleteOrder } from '../../store/slices/orders-slice';
import { formatDate, formatOrderId } from '../../utils';

interface OrderListItemProps {
  order: OrderResponse;
  onDelete: () => void;
}

export default function OrderListItem({order, onDelete}: OrderListItemProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    evt.preventDefault();

    await dispatch(deleteOrder(order.id)).unwrap();
    onDelete();
  };

  return (
    <li className="orders__item">
      <h3 className="orders__number"><Link to={`/order-list/${order.id}`}>Заказ №{formatOrderId(order.id)}</Link></h3>
      <span className="orders__items">
        товаров&nbsp;<b className="orders__items-qty">{order.orderItems.reduce((sum, orderItem) => sum + orderItem.quantity, 0)}</b>
      </span>
      <span className="orders__date">{formatDate(order.createdAt)}</span>
      <b className="orders__sum">
        {formatPrice(order.sumPrice)}<span className="orders__rouble">₽</span>
      </b>
      <button
        className="button button--small orders__remove-button"
        type="button"
        onClick={handleDeleteClick}
      >
        Удалить
      </button>
    </li>
  );
}
