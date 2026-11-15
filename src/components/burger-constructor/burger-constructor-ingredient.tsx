import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  removeIngredient,
  sortIngredients,
} from '@/services/slices/burgerCounstructorSlice';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { ISelectedIngredient } from '@/utils/types';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './burger-constructor.module.css';

type TBurgerConstructorIngredientProps = {
  selectedIngredient: ISelectedIngredient;
  index: number;
};

export const BurgerConstructorIngredient = ({
  selectedIngredient,
  index,
}: TBurgerConstructorIngredientProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedIngredientRef = useRef<HTMLLIElement>(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient-sorted',
    item: { selectedIngredient, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'ingredient-sorted',
    hover: (item: TBurgerConstructorIngredientProps, monitor) => {
      const selectedIngredientRect =
        selectedIngredientRef.current?.getBoundingClientRect();
      const cursorPosition = monitor.getClientOffset();

      if (typeof selectedIngredientRect === 'undefined' || cursorPosition === null) {
        return;
      }

      const selectedIngredientMiddlePosition =
        selectedIngredientRect.top + selectedIngredientRect.height / 2;

      if (
        (item.index > index && cursorPosition.y < selectedIngredientMiddlePosition) || // тянем вверх
        (item.index < index && cursorPosition.y > selectedIngredientMiddlePosition) // тянем вниз
      ) {
        dispatch(
          sortIngredients({
            toIndex: index,
            fromIndex: item.index,
          })
        );
        item.index = index;
      }
    },
  });

  return (
    <>
      {selectedIngredient.ingredient && (
        <li
          key={selectedIngredient.uuid}
          ref={(node) => {
            selectedIngredientRef.current = node;
            dragRef(node);
            dropRef(node);
          }}
          className={isDrag ? `${styles.hiddenConstructorElement}` : undefined}
        >
          <div className={styles.burgerConstructorCard}>
            <div className={styles.dragIcon}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              handleClose={() => {
                dispatch(removeIngredient(selectedIngredient.uuid));
              }}
              price={selectedIngredient.ingredient.price}
              text={selectedIngredient.ingredient.name}
              thumbnail={selectedIngredient.ingredient.image}
            />
          </div>
        </li>
      )}
    </>
  );
};
