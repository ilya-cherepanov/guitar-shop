import { ProductResponse } from '@guitar-shop/shared-types';
import { MouseEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorizationStatus, BACKEND_STATIC_URL } from '../../constants';
import { useAppSelector } from '../../hooks';
import { selectCartItems } from '../../store/slices/cart-slice';
import { selectAuthorizationStatus } from '../../store/slices/user-slice';
import AddProductModal from '../add-product-modal/add-product-modal';
import EnterModal from '../enter-modal/enter-modal';
import { formatPrice } from '../price-filter/utils';
import Rating from './rating';


interface ProductCardProps {
  product: ProductResponse,
}


export default function ProductCard({product}: ProductCardProps) {
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const [showEnterModal, setShowEnterModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const cart = useAppSelector(selectCartItems);
  const isPurchased = !!(cart && cart.find((cartItem) => cartItem[0].id === product.id));
  const navigate = useNavigate();

  const handleAddToCartButton: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth) {
      if (isPurchased) {
        navigate('/cart');
      } else {
        setShowAddProductModal(true);
      }
    } else {
      setShowEnterModal(true);
    }
  };

  return (
    <div className="product-card">
      <img
        src={`${BACKEND_STATIC_URL}/${product.photo}`}
        width="75"
        height="190"
        alt={product.title}
      />
      <div className="product-card__info">
        <Rating rating={product.avgRating} totalRatings={product.commentsCount} showCount />
        <p className="product-card__title">{product.title}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatPrice(product.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`/products/${product.id}`}>
          Подробнее
        </Link>
        <a
          className={`button button--red button--mini ${isPurchased ? 'button--in-cart button--red-border' : 'button--add-to-cart'}`}
          href="/cart"
          onClick={handleAddToCartButton}
        >
          {isPurchased ? 'В корзине' : 'Купить'}
        </a>
      </div>
      {showEnterModal && <EnterModal onClose={() => setShowEnterModal(false)} />}
      {showAddProductModal && <AddProductModal onClose={() => setShowAddProductModal(false)} product={product} />}
    </div>
  );
}
