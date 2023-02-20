import { useEffect, useState, MouseEvent, MouseEventHandler } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddProductModal from '../../components/add-product-modal/add-product-modal';
import Comments from '../../components/comments/comments';
import EnterModal from '../../components/enter-modal/enter-modal';
import Spinner from '../../components/spinner/spinner';
import { AuthorizationStatus, BACKEND_STATIC_URL, LoadingStatus, ProductTab, ProductTypeTranslation } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneProduct, selectLoadingStatus, selectProduct } from '../../store/slices/one-product-slice';
import { selectAuthorizationStatus } from '../../store/slices/user-slice';
import Rating from '../../components/rating/rating';
import { formatPrice } from '../../utils';
import NotFound from '../not-found/not-found';

export default function Product() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const { id } = useParams();
  const product = useAppSelector(selectProduct);
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const [currentTab, setCurrentTab] = useState(ProductTab.Characteristics);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEnterModal, setShowEnterModal] = useState(false);

  useEffect(() => {
    dispatch(fetchOneProduct(Number(id)));
  }, [dispatch, id]);

  const handleTabClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    tab: ProductTab
  ) => {
    evt.preventDefault();
    setCurrentTab(tab);
  };

  if (loadingStatus === LoadingStatus.Failed) {
    return <NotFound />;
  }

  if (!product) {
    return <Spinner />
  }

  const handleAddToCartButton: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth) {
      setShowAddProductModal(true);
    } else {
      setShowEnterModal(true);
    }
  }

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
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
            <a className="link">Товар</a>
          </li>
        </ul>
        <div className="product-container">
          <img
            className="product-container__img"
            src={`${BACKEND_STATIC_URL}/${product.photo}`}
            width="90"
            height="235"
            alt={product.title}
          />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">
              {product.title}
            </h2>
            <Rating rating={product.avgRating} totalRatings={product.commentsCount} starSize={[14, 14]} showCount classModifier="product-container__rating" />
            <div className="tabs">
              <a
                className={`button button--medium tabs__button ${
                  currentTab === ProductTab.Characteristics
                    ? ''
                    : 'button--black-border'
                }`}
                href="#characteristics"
                onClick={(evt) =>
                  handleTabClick(evt, ProductTab.Characteristics)
                }
              >
                Характеристики
              </a>
              <a
                className={`button button--medium tabs__button ${
                  currentTab === ProductTab.Description
                    ? ''
                    : 'button--black-border'
                }`}
                href="#description"
                onClick={(evt) => handleTabClick(evt, ProductTab.Description)}
              >
                Описание
              </a>
              <div className="tabs__content" id="characteristics">
                <table
                  className={`tabs__table ${
                    currentTab === ProductTab.Characteristics ? '' : 'hidden'
                  }`}
                >
                  <tbody>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{product?.article}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">
                      {product ? ProductTypeTranslation[product.type] : ''}
                    </td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">
                      {product?.numberOfStrings} струнная
                    </td>
                  </tr>
                  </tbody>
                </table>
                <p
                  className={`tabs__product-description ${
                    currentTab === ProductTab.Description ? '' : 'hidden'
                  }`}
                >
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">
              Цена:
            </p>
            <p className="product-container__price-info product-container__price-info--value">
              {formatPrice(product.price)} ₽
            </p>
            <a
              className="button button--red button--big product-container__button"
              href="/cart"
              onClick={handleAddToCartButton}
            >
              Добавить в корзину
            </a>
          </div>
        </div>
        <Comments productId={Number(id)} productTitle={product.title} />
        {showAddProductModal && <AddProductModal product={product} onClose={() => setShowAddProductModal(false)} />}
        {showEnterModal && <EnterModal onClose={() => setShowEnterModal(false)} />}
      </div>
    </main>
  );
}
