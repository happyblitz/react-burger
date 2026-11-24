import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const homePath = '/';
  const feedPath = '/feed';
  const profilePath = '/profile';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {/* Тут должны быть ссылки, а не например кнопки или абзацы */}
          <NavLink
            to={homePath}
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? 'link_active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>
          <NavLink
            to={feedPath}
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? 'link_active' : ''} ml-10`
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Link to={homePath} className={styles.logo_link}>
            <Logo />
          </Link>
        </div>
        <div className={styles.position_last}>
          <NavLink
            to={profilePath}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? 'link_active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
