import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

export const InrgedientDetails = ({
  ingredient,
}: {
  ingredient: TIngredient;
}): React.JSX.Element => {
  return (
    <article className={styles.ingredientDetails}>
      <img
        className={`${styles.image} pr-4 pl-4`}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h3 className="text text_type_main-medium">{ingredient.name}</h3>
      <div
        className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
      >
        <div className={styles.nutritionCategory}>
          <dt>Калории, ккал</dt>
          <dd>{ingredient.calories}</dd>
        </div>
        <div className={styles.nutritionCategory}>
          <dt>Белки, г</dt>
          <dd>{ingredient.proteins}</dd>
        </div>
        <div className={styles.nutritionCategory}>
          <dt>Жиры, г</dt>
          <dd>{ingredient.fat}</dd>
        </div>
        <div className={styles.nutritionCategory}>
          <dt>Углеводы, г</dt>
          <dd>{ingredient.carbohydrates}</dd>
        </div>
      </div>
    </article>
  );
};
