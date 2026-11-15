import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  getBunSelector,
  getIngredientsSelector,
} from '@/services/slices/burgerCounstructorSlice';
import {
  modalIngredientInfoSelector,
  openIngredientInfoModal,
  closeModal,
} from '@/services/slices/modalSlice';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { InrgedientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import type { TIngredient, TAddIngredientPayload } from '@utils/types';

import styles from './burger-ingredient-card.module.css';

type TBurgerIngredientCardProps = {
  ingredient: TIngredient;
};

export const BurgerIngredientCard = ({
  ingredient,
}: TBurgerIngredientCardProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const bun = useAppSelector(getBunSelector);
  const ingredients = useAppSelector(getIngredientsSelector);

  let count = 0;

  if (ingredient.type === 'bun') {
    if (bun === ingredient._id) {
      count = 2;
    }
  } else {
    count = ingredients.reduce((acc, i) => (i.id === ingredient._id ? ++acc : acc), 0);
  }

  const isModalOpen = useAppSelector(modalIngredientInfoSelector) === ingredient._id;

  const [, dragRef] = useDrag<TAddIngredientPayload>({
    type: 'ingredient',
    item: { id: ingredient._id, type: ingredient.type },
  });

  function showDetailes(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    dispatch(openIngredientInfoModal(ingredient._id));
  }

  return (
    <article className={styles.card}>
      <a className={styles.cardLink} href="" onClick={showDetailes}>
        <img
          className={`${styles.image} pr-4 pl-4`}
          src={ingredient.image}
          alt={ingredient.name}
          ref={(node) => {
            dragRef(node);
          }}
        />
        <div className={`${styles.priceBox} text text_type_digits-default`}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={styles.title}>{ingredient.name}</h3>
        {count && (
          <div className={styles.count}>
            <Counter count={count} size="default" />
          </div>
        )}
      </a>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={() => dispatch(closeModal())}>
          <InrgedientDetails ingredient={ingredient} />
        </Modal>
      )}
    </article>
  );
};
