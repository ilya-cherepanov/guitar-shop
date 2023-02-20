import { UserRole } from '@guitar-shop/shared-types';
import { MouseEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCartProductCount } from '../../store/slices/cart-slice';
import {
  logoutUser,
  selectAuthorizationStatus,
  selectUser,
} from '../../store/slices/user-slice';
import EnterModal from '../enter-modal/enter-modal';

export default function Header() {
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);
  const cartProductCount = useAppSelector(selectCartProductCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showEnterModal, setShowEnterModal] = useState(false);

  const handleProfileClick: MouseEventHandler<HTMLAnchorElement> = async (
    evt
  ) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(logoutUser());
    } else {
      navigate('/login');
    }
  };

  const handleBasketClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth) {
      navigate('/cart');
    } else {
      setShowEnterModal(true);
    }
  }

  return (
    <header
      className={`header ${
        user?.role === UserRole.Admin ? 'header--admin' : ''
      } ${
        user?.role === UserRole.Customer && cartProductCount > 0
          ? 'header--logged'
          : ''
      } ${
        user?.role === UserRole.Customer && cartProductCount <= 0
          ? 'header--logged-empty'
          : ''
      }`}
      id="header"
    >
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to="/">
            <img
              className="logo__img"
              width="70"
              height="70"
              src="/img/svg/logo.svg"
              alt="Логотип"
            />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="link main-nav__link" to="/">
                  Каталог
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className="link main-nav__link"
                  to={
                    user?.role === UserRole.Admin
                      ? 'order-list'
                      : 'where-to-buy'
                  }
                >
                  {user?.role === UserRole.Admin
                    ? 'Список заказов'
                    : 'Где купить?'}
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className="link main-nav__link"
                  to={user?.role === UserRole.Admin ? 'product-list' : 'about'}
                >
                  {user?.role === UserRole.Admin
                    ? 'Список товаров'
                    : 'О компании'}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">{user ? user.name : ''}</span>{' '}
            <a
              className="header__link"
              href="/login"
              aria-label="Перейти в личный кабинет"
              onClick={handleProfileClick}
            >
              <svg
                className="header__link-icon"
                width="12"
                height="14"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </a>
            <a
              className="header__cart-link"
              href="/cart"
              aria-label="Перейти в корзину"
              onClick={handleBasketClick}
            >
              <svg
                className="header__cart-icon"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-basket"></use>
              </svg>
              <span className="header__cart-count">{cartProductCount}</span>
            </a>
          </div>
        </div>
      </div>
      {showEnterModal && <EnterModal onClose={() => setShowEnterModal(false)} />}
    </header>
  );
}
