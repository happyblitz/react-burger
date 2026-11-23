import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const homePath = '/';
  const feedPath = '/feed';
  const profilePath = '/profile';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {/* Тут должны быть ссылки, а не например кнопки или абзацы */}
          <Link
            to={homePath}
            className={`${styles.link} ${pathname === homePath ? styles.link_active : ''}`}
          >
            <BurgerIcon type={pathname === homePath ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </Link>
          <Link
            to={feedPath}
            className={`${styles.link} ${pathname === feedPath ? styles.link_active : ''} ml-10`}
          >
            <ListIcon type={pathname === feedPath ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.position_last}>
          <Link
            to="/profile"
            className={`${styles.link} ${pathname.startsWith(profilePath) ? styles.link_active : ''}`}
          >
            <ProfileIcon
              type={pathname.startsWith(profilePath) ? 'primary' : 'secondary'}
            />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
