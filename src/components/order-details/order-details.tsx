import { getRtkError } from '@/utils/getRtkError';
import { CheckMarkIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';

import type { TCreateOrderMutation } from '@/utils/types';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  isLoading: boolean;
  data: TCreateOrderMutation | undefined;
  isError: boolean;
  error: unknown;
};

export const OrderDetails = ({
  isLoading,
  data,
  isError,
  error,
}: TOrderDetailsProps): React.JSX.Element => {
  if (isLoading) {
    return (
      <article className={styles.orderDetails}>
        <Preloader />
      </article>
    );
  }

  if (isError) {
    return <p>Произошла непредвиденная ошибка: {getRtkError(error)}</p>;
  }

  return (
    <article className={styles.orderDetails}>
      <h3 className={`${styles.orderNumber} mb-8 text text_type_digits-large`}>
        {data?.order.number}
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
