import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { InrgedientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredient-card.module.css';

type TBurgerIngredientCardProps = {
  ingredient: TIngredient;
  count: number;
};

export const BurgerIngredientCard = ({
  ingredient,
  count,
}: TBurgerIngredientCardProps): React.JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function showDetailes(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    setModalIsOpen(true);
  }

  const closeModal = (): void => {
    setModalIsOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <article className={styles.card}>
      <a className={styles.cardLink} href="" onClick={showDetailes}>
        <img
          className={`${styles.image} pr-4 pl-4`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styles.priceBox} text text_type_digits-default`}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={styles.title}>{ingredient.name}</h3>
        <div className={styles.count}>
          <Counter count={count} size="default" />
        </div>
      </a>
      {modalIsOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <InrgedientDetails ingredient={ingredient} />
        </Modal>
      )}
    </article>
  );
};
