import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { getRtkError } from '@/utils/getRtkError';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './home-page.module.css';

export const HomePage = (): React.JSX.Element => {
  const { isLoading, isError, error, data: ingredients } = useGetIngredientsQuery();

  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <p>Произошла непредвиденная ошибка: {getRtkError(error)}</p>;
  }

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {ingredients && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
        <Outlet />
      </main>
    </>
  );
};
