import { CreateOrderRequest } from '@guitar-shop/shared-types';
import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalSuccess from '../../components/modal-success/modal-success';
import { formatPrice } from '../../components/price-filter/utils';
import Spinner from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCart, selectCartItems } from '../../store/slices/cart-slice';
import { createOrder } from '../../store/slices/orders-slice';
import { selectUser } from '../../store/slices/user-slice';
import CartItem from './cart-item';

export default function Cart() {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!cartItems) {
    return <Spinner />
  }

  const handleCreateOrderButton: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    evt.preventDefault();

    if (!cartItems || cartItems.length <= 0 || !user) {
      return;
    }

    const order: CreateOrderRequest = {
      items: cartItems.map(([product, quantity]) => ({productId: product.id, quantity})),
    };

    try {
      await dispatch(createOrder(order)).unwrap();
      await dispatch(clearCart(user.id)).unwrap();
      setShowSuccessModal(true);
    } catch (err) {
      toast.error('Ошибка при создании заказа!');
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
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
          <li className="breadcrumbs__item">
            <a className="link">Корзина</a>
          </li>
        </ul>
        {cartItems && (
          <div className="cart">
            {cartItems.map(([product, quantity]) => <CartItem product={product} quantity={quantity} key={product.id} />)}
            <div className="cart__footer">
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{formatPrice(cartItems.reduce((sum, [product, quantity]) => sum + product.price * quantity, 0))} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">
                    {formatPrice(cartItems.reduce((sum, [product, quantity]) => sum + product.price * quantity, 0))} ₽
                  </span>
                </p>
                <button className="button button--red button--big cart__order-button" type="button" onClick={handleCreateOrderButton}>
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSuccessModal && <ModalSuccess onClose={() => setShowSuccessModal(false)} message="Спасибо за ваш заказ!" />}
    </main>
  );
}
