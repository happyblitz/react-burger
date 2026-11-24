import { useAppDispatch } from '@/hooks/useAppDispatch';
import { authApi, useLogoutMutation } from '@/services/api/authApi';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { ProtectedRoute } from '../protected-route/protected-route';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { pathname } = useLocation();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout().unwrap();
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(authApi.util.resetApiState());
      void navigate('/');
    }
  };

  const handleClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    void handleLogout();
  };

  return (
    <ProtectedRoute>
      <section className={`${styles.section} flex-container`}>
        <div className={styles.container}>
          <aside className="flex-container text text_type_main-medium">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) => (isActive ? 'link_active' : '')}
            >
              Профиль
            </NavLink>
            <NavLink
              to="/profile/orders"
              end
              className={({ isActive }) => (isActive ? 'link_active' : '')}
            >
              История заказов
            </NavLink>
            <button className="link" onClick={handleClick}>
              Выход
            </button>
          </aside>
          <Outlet />
          {pathname === '/profile' && (
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете
              <br />
              изменить свои персональные данные
            </p>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
};
