import { UserRole } from '@guitar-shop/shared-types';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddProduct from '../../pages/add-product/add-product';
import Cart from '../../pages/cart/cart';
import Catalog from '../../pages/catalog/catalog';
import EditProduct from '../../pages/edit-product/edit-product';
import LoginPage from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import OrderList from '../../pages/order-list/order-list';
import Order from '../../pages/order/order';
import ProductList from '../../pages/product-list/product-list';
import Product from '../../pages/product/product';
import RegistrationPage from '../../pages/registration/registration';
import { loadCart, resetCartState } from '../../store/slices/cart-slice';
import { checkUser, selectAuthorizationStatus, selectUser } from '../../store/slices/user-slice';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';


export default function App() {
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      dispatch(loadCart(user.id));
    } else {
      dispatch(resetCartState());
    }
  }, [user, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<Catalog />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="product-list">
          <Route index element={<PrivateRoute authorizationStatus={authStatus} user={user} userRole={[UserRole.Admin]}><ProductList /></PrivateRoute>} />
          <Route path="add" element={<PrivateRoute authorizationStatus={authStatus} user={user} userRole={[UserRole.Admin]}><AddProduct /></PrivateRoute>} />
          <Route path="edit/:id" element={<PrivateRoute authorizationStatus={authStatus} user={user} userRole={[UserRole.Admin]}><EditProduct /></PrivateRoute>} />
        </Route>
        <Route path="cart" element={<PrivateRoute authorizationStatus={authStatus} user={user} userRole={[UserRole.Customer, UserRole.Admin]}><Cart /></PrivateRoute>}/>
        <Route path="order-list" element={<PrivateRoute authorizationStatus={authStatus} user={user} userRole={[UserRole.Admin]}><OrderList /></PrivateRoute>} />
        <Route path="order-list/:id" element={<PrivateRoute authorizationStatus={authStatus} user={user} userRole={[UserRole.Admin]}><Order /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
