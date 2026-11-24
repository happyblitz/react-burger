import { useAppSelector } from '@/hooks/useAppSelector';
import { isAuthCheckedSelector, userSelector } from '@/services/slices/userSlice';
import { Navigate, useLocation, type To } from 'react-router-dom';

export const ProtectedRoute = ({
  children,
  auth = true,
}: {
  children: React.JSX.Element;
  auth?: boolean;
}): React.JSX.Element | null => {
  const isAuthChecked = useAppSelector(isAuthCheckedSelector);
  const user = useAppSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (auth) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } else {
    if (user) {
      const from = (location.state as { from: To } | null)?.from ?? { pathname: '/' };
      return <Navigate to={from} replace />;
    }
  }

  return <>{children}</>;
};
