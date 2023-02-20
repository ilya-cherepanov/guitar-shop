import { ProductResponse } from '@guitar-shop/shared-types';
import { MouseEventHandler } from 'react';
import { AuthorizationStatus, BACKEND_STATIC_URL, ProductTypeTranslation } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addProductToCart } from '../../store/slices/cart-slice';
import { selectAuthorizationStatus, selectUser } from '../../store/slices/user-slice';
import Modal from '../modal/modal';
import { formatPrice } from '../price-filter/utils';


interface AddProductModalProps {
  product: ProductResponse;
  onClose: () => void;
}


export default function AddProductModal({ product, onClose }: AddProductModalProps) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);

  const handleClickAddButton: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth && user) {
      await dispatch(addProductToCart({product, userId: user.id})).unwrap()
    }

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="modal__header title title--medium">
        Добавить товар в корзину
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
            Гитара {product.title}
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
        <button className="button button--red button--big modal__button modal__button--add" type="button" onClick={handleClickAddButton}>
          Добавить в корзину
        </button>
      </div>
    </Modal>
  );
}
