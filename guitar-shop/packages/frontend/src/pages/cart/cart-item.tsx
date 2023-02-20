import { ProductResponse } from '@guitar-shop/shared-types';
import { MouseEventHandler, useState } from 'react';
import RemoveProductModal from '../../components/remove-product-modal/remove-product-modal';
import { AuthorizationStatus, BACKEND_STATIC_URL, ProductTypeTranslation } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { decCartProduct, incCartProduct } from '../../store/slices/cart-slice';
import { selectAuthorizationStatus, selectUser } from '../../store/slices/user-slice';
import { formatPrice } from '../../utils';

interface CartItemProps {
  product: ProductResponse;
  quantity: number;
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authStatus = useAppSelector(selectAuthorizationStatus)
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handlePlusButton: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth && user) {
      dispatch(incCartProduct({productId: product.id, userId: user.id}));
    }
  };

  const handleMinusButton: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth && user) {
      dispatch(decCartProduct({productId: product.id, userId: user.id}));
    }
  };

  const handleDeleteButton: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth && user) {
      setShowRemoveModal(true);
    }
  };

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteButton}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={`${BACKEND_STATIC_URL}/${product.photo}`}
          width="55"
          height="130"
          alt={product.title}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{product.title}</p>
        <p className="product-info__info">Артикул: {product.article}</p>
        <p className="product-info__info">{ProductTypeTranslation[product.type]}, {product.numberOfStrings} струнная</p>
      </div>
      <div className="cart-item__price">{formatPrice(product.price)} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" type="button" onClick={handleMinusButton}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder={`${quantity}`}
          max="99"
          readOnly
        />
        <button className="quantity__button" aria-label="Увеличить количество" type="button" onClick={handlePlusButton}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(product.price * quantity)} ₽</div>
      {showRemoveModal && <RemoveProductModal product={product} onClose={() => setShowRemoveModal(false)} />}
    </div>
  );
}
