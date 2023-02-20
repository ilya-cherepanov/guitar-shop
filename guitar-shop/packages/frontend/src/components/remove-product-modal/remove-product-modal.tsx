import { ProductResponse } from '@guitar-shop/shared-types';
import { MouseEventHandler } from 'react';
import { AuthorizationStatus, BACKEND_STATIC_URL, ProductTypeTranslation } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteProductFromCart } from '../../store/slices/cart-slice';
import { selectAuthorizationStatus, selectUser } from '../../store/slices/user-slice';
import { formatPrice } from '../../utils';
import Modal from '../modal/modal';

interface RemoveProductModalProps {
  onClose: () => void;
  product: ProductResponse;
}

export default function RemoveProductModal({product, onClose}: RemoveProductModalProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  const handleDeleteButton: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    evt.preventDefault();
    if (authStatus !== AuthorizationStatus.Auth || !user) {
      onClose();
      return;
    }

    await dispatch(deleteProductFromCart({productId: product.id, userId: user.id})).unwrap()
    onClose();
  };

  const handleContinueButton: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="modal__header title title--medium title--red">
        Удалить этот товар?
      </h2>
      <div className="modal__info">
        <img
          className="modal__img"
          src={`${BACKEND_STATIC_URL}/${product.photo}`}
          width="67"
          height="137"
          alt={product.title}
        />
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">
            {product.title}
          </h3>
          <p className="modal__product-params modal__product-params--margin-11">
            Артикул: {product.article}
          </p>
          <p className="modal__product-params">{ProductTypeTranslation[product.type]}, {product.numberOfStrings} струнная</p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">{formatPrice(product.price)} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button className="button button--small modal__button" type="button" onClick={handleDeleteButton}>
          Удалить товар
        </button>
        <button className="button button--black-border button--small modal__button modal__button--right" type="button" onClick={handleContinueButton}>
          Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}
