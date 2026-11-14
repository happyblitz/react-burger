import { getRtkError } from '@/utils/getRtkError';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { TIngredient } from '@/utils/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type AppBodyProps = {
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  ingredients: TIngredient[] | undefined;
};

export const AppBody = ({
  isLoading,
  isError,
  error,
  ingredients,
}: AppBodyProps): React.JSX.Element => {
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
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </DndProvider>
      )}
    </>
  );
};
