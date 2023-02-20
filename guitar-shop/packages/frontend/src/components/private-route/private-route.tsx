import { UserResponse, UserRole } from '@guitar-shop/shared-types';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
  userRole: UserRole[];
  user: UserResponse | null;
};

function PrivateRoute({
  children,
  authorizationStatus,
  user,
  userRole,
}: PrivateRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Unknown || (authorizationStatus === AuthorizationStatus.Auth && user && userRole.includes(user.role as UserRole)) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
