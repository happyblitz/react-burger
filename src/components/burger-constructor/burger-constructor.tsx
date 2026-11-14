import { useGetSelectedBun } from '@/hooks/useGetSelectedBun';
import { useGetSelectedIngredients } from '@/hooks/useGetSelectedIngredients';
import { useCreateOrderMutation } from '@/services/api/createOrderApi';
import { addIngredient, resetCart } from '@/services/slices/burgerCounstructorSlice';
import { currentOrder } from '@/services/slices/ordersSlice';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorIngredient } from './burger-constructor-ingredient';

import type { TAddIngredientPayload } from '@utils/types';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [
    createOrder,
    { isLoading, data, isError, isSuccess, error, reset: resetCreateOrder },
  ] = useCreateOrderMutation();

  const isModalOpen = isLoading || isSuccess || isError;

  const noBunMessage = 'Выберите булки';
  const bun = useGetSelectedBun();
  const ingredients = useGetSelectedIngredients();

  const orderPrice =
    (bun?.price ?? 0) * 2 +
    ingredients.reduce((acc, i) => {
      return acc + (i.ingredient?.price ?? 0);
    }, 0);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item: TAddIngredientPayload) => {
      dispatch(addIngredient(item));
    },
  });

  const handleCreateOrder = (): void => {
    if (!bun) {
      return;
    }

    const orderIngredients = [
      bun._id,
      ...ingredients.flatMap((i) =>
        typeof i.ingredient === 'undefined' ? [] : i.ingredient._id
      ),
      bun._id,
    ];

    void createOrder(orderIngredients);
  };

  const handleCloseModal = (): void => {
    if (isSuccess) {
      dispatch(currentOrder(data.order.number));
      dispatch(resetCart());
    }

    if (isSuccess || isError) {
      resetCreateOrder();
    }
  };

  return (
    <section
      className={styles.burgerConstructor}
      ref={(node) => {
        dropRef(node);
      }}
    >
      <ul className={styles.burgerConstructorItemsList}>
        <li>
          <div className={styles.burgerConstructorCard}>
            {bun && (
              <ConstructorElement
                isLocked
                price={bun.price}
                text={bun.name}
                thumbnail={bun.image}
                type="top"
              />
            )}
            {!bun && (
              <div
                className={`constructor-element constructor-element_pos_top ${styles.emptyConstructorElement}`}
              >
                {noBunMessage}
              </div>
            )}
          </div>
        </li>
        <li>
          <ul className={`${styles.burgerConstructorIngredientsList} custom-scroll`}>
            {ingredients.length > 0 &&
              ingredients.map((selectedIngredient, index) =>
                selectedIngredient.ingredient ? (
                  <BurgerConstructorIngredient
                    selectedIngredient={selectedIngredient}
                    key={selectedIngredient.uuid}
                    index={index}
                  />
                ) : null
              )}
            {!ingredients.length && (
              <li>
                <div className={styles.burgerConstructorCard}>
                  <div className={styles.dragIcon}>
                    <DragIcon type="primary" />
                  </div>
                  <div
                    className={`constructor-element ${styles.emptyConstructorElement}`}
                  >
                    Выберите начинку
                  </div>
                </div>
              </li>
            )}
          </ul>
        </li>
        <li>
          <div className={styles.burgerConstructorCard}>
            {bun && (
              <ConstructorElement
                isLocked
                price={bun.price}
                text={bun.name}
                thumbnail={bun.image}
                type="bottom"
              />
            )}
            {!bun && (
              <div
                className={`constructor-element constructor-element_pos_bottom ${styles.emptyConstructorElement}`}
              >
                {noBunMessage}
              </div>
            )}
          </div>
        </li>
      </ul>

      <div className={styles.cartSummary}>
        <div className={`${styles.priceBox} text text_type_digits-medium`}>
          {orderPrice}
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleCreateOrder}
          size="large"
          type="primary"
          htmlType="button"
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal title="" onClose={handleCloseModal}>
          <OrderDetails
            isLoading={isLoading}
            data={data}
            isError={isError}
            error={error}
          />
        </Modal>
      )}
    </section>
  );
};
