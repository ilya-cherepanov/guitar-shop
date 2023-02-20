import { OrderResponse } from '@guitar-shop/shared-types';
import { MouseEventHandler } from 'react';
import { formatPrice } from '../../components/price-filter/utils';
import { ProductTypeTranslation } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { deleteOrder, deleteOrderItem } from '../../store/slices/orders-slice';

interface OrderItemProps {
  orderItem: OrderResponse['orderItems'][number];
  orderId: number;
  onDelete?: () => void;
}

export default function OrderItem({ orderItem, orderId, onDelete }: OrderItemProps) {
  const dispatch = useAppDispatch();

  const handleDeleteButton: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    evt.preventDefault();

    await dispatch(deleteOrderItem({
      orderId: orderId,
      productId: orderItem.productId
    })).unwrap();
    // onDelete();
  };

  return (
    <li className="order-list__item">
      <div className="order-list__data">
        <img
          src={`http://localhost:3333/static/${orderItem.product.photo}`}
          width="60"
          height="130"
          alt={orderItem.product.title}
        />
        <div className="order-list__container">
          <p className="order-list__name">{ProductTypeTranslation[orderItem.product.type]} {orderItem.product.title}</p>
          <p className="order-list__lot">Артикул: {orderItem.product.article}</p>
          <p className="order-list__parameters">{ProductTypeTranslation[orderItem.product.type]}, {orderItem.product.numberOfStrings} струнная</p>
        </div>
      </div>
      <span className="order-list__quantity">{orderItem.quantity}</span>
      <span className="order-list__price">{formatPrice(orderItem.sumPrice)} ₽</span>
      <button
        className="order-list__button button-cross"
        type="button"
        aria-label="Закрыть"
        onClick={handleDeleteButton}
      >
        <span className="button-cross__icon"></span>
      </button>
    </li>
  );
}
