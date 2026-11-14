import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';

import { AppBody } from '@components/app-body/app-body';
import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { isLoading, isError, error, data: ingredients } = useGetIngredientsQuery();

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <AppBody
          isLoading={isLoading}
          isError={isError}
          error={error}
          ingredients={ingredients}
        />
      </main>
    </div>
  );
};

export default App;
