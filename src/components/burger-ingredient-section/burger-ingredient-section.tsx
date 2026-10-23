import { BurgerIngredientCard } from '../burger-ingridient-card/burger-ingredient-card';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredient-section.module.css';

type TBurgerIngredientSectionProps = {
  title: string;
  ingredients: TIngredient[];
  innerRef: (el: HTMLElement | null) => void;
};

export const BurgerIngredientSection = ({
  title,
  ingredients,
  innerRef,
}: TBurgerIngredientSectionProps): React.JSX.Element => {
  return (
    <section>
      <h2 className={styles.sectionHeading} ref={innerRef}>
        {title}
      </h2>
      <ul className={styles.itemsList}>
        {ingredients.map((i) => (
          <li key={i._id}>
            <BurgerIngredientCard ingredient={i} count={0} />
          </li>
        ))}
      </ul>
    </section>
  );
};
