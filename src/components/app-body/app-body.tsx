import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { getRtkError } from '@/utils/getRtkError';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

export const AppBody = (): React.JSX.Element => {
  const { isLoading, isError, error, data: ingredients } = useGetIngredientsQuery();

  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <p>Произошла непредвиденная ошибка: {getRtkError(error)}</p>;
  }

  return (
    <>
      {ingredients && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </>
  );
};
