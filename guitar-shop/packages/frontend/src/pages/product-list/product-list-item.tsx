import { ProductResponse } from '@guitar-shop/shared-types';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../components/price-filter/utils';
import Rating from '../../components/rating/rating';
import { ProductTypeTranslation } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { deleteProduct } from '../../store/slices/products-slice';
import { formatDate } from '../../utils';

interface ProductListItemProps {
  product: ProductResponse;
  onDelete: () => void;
}

export default function ProductListItem({ product, onDelete }: ProductListItemProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    evt.preventDefault();

    await dispatch(deleteProduct(product.id)).unwrap();
    onDelete();
  };

  return (
    <>
      <div className="catalog-item__data">
        <img
          src={`http://localhost:3333/static/${product.photo}`}
          width="36"
          height="93"
          alt={product.title}
        />
        <div className="catalog-item__data-wrapper">
          <p className="catalog-item__data-title">{ProductTypeTranslation[product.type]} {product.title}</p>
          <Rating rating={product.avgRating} totalRatings={product.commentsCount} starSize={[14, 14]} classModifier={'catalog-item__data-rate'} />
          <p className="catalog-item__data-date">Дата добавления {formatDate(product.createdAt)}</p>
          <p className="catalog-item__data-price">{formatPrice(product.price)} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          className="button button--small button--black-border"
          to={`/product-list/edit/${product.id}`}
          aria-label="Редактировать товар"
        >
          Редактировать
        </Link>
        <button
          className="button button--small button--black-border"
          type="button"
          aria-label="Удалить товар"
          onClick={handleDeleteClick}
        >
          Удалить
        </button>
      </div>
    </>
  );
}
