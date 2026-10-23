import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  return (
    <article className={styles.orderDetails}>
      <h3 className={`${styles.orderNumber} mb-8 text text_type_digits-large`}>
        034536
      </h3>
      <p className={`mb-15 text text_type_main-medium`}>идентификатор заказа</p>
      <div className={`${styles.checkIconWrapper} mb-15`}>
        <CheckMarkIcon className={styles.checkIcon} type="primary" />
        <img className={styles.iconSpot1} src="/spot1.svg" alt="пятно 1" />
        <img className={styles.iconSpot2} src="/spot2.svg" alt="пятно 2" />
        <img className={styles.iconSpot3} src="/spot3.svg" alt="пятно 3" />
      </div>
      <p className={`mb-2 text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`mb-15 text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </article>
  );
};
