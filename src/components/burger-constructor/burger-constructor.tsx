import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log(ingredients);

  return (
    <section className={styles.burgerConstructor}>
      <ul className={styles.burgerConstructorItemsList}>
        <li>
          <div className={styles.burgerConstructorCard}>
            <ConstructorElement
              handleClose={function fee() {
                console.log('fee close');
              }}
              isLocked
              price={200}
              text="Краторная булка N-200i (верх)"
              thumbnail="https://react-burger-ui-components.education-services.ru/assets/img-CFqVEZmj.png"
              type="top"
            />
          </div>
        </li>
        <li>
          <ul className={`${styles.burgerConstructorIngredientsList} custom-scroll`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i}>
                <div className={styles.burgerConstructorCard}>
                  <div className={styles.dragIcon}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    handleClose={function fee() {
                      console.log('fee close');
                    }}
                    price={50}
                    text="Краторная булка N-200i"
                    thumbnail="https://react-burger-ui-components.education-services.ru/assets/img-CFqVEZmj.png"
                  />
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <div className={styles.burgerConstructorCard}>
            <ConstructorElement
              handleClose={function fee() {
                console.log('fee close');
              }}
              isLocked
              price={200}
              text="Краторная булка N-200i (низ)"
              thumbnail="https://react-burger-ui-components.education-services.ru/assets/img-CFqVEZmj.png"
              type="bottom"
            />
          </div>
        </li>
      </ul>

      <div className={styles.cartSummary}>
        <div className={`${styles.priceBox} text text_type_digits-medium`}>
          610
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => setModalIsOpen(true)}
          size="large"
          type="primary"
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
      {modalIsOpen && (
        <Modal title="" onClose={() => setModalIsOpen(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
