import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

import { BurgerIngredientSection } from '../burger-ingredient-section/burger-ingredient-section';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('bun');
  const ingredientsHeadings = useRef<Record<string, HTMLElement | null>>({});

  const scrollToAnchor = (activeTabId: string): void => {
    const ingredientsHeadingElement = ingredientsHeadings.current[activeTabId];

    if (ingredientsHeadingElement) {
      ingredientsHeadingElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const tabs = [
    {
      id: 'bun',
      title: 'Булки',
    },
    {
      id: 'sauce',
      title: 'Соусы',
    },
    {
      id: 'main',
      title: 'Начинки',
    },
  ];

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menuTabs}>
          {tabs.map((t) => (
            <Tab
              key={t.id}
              value={t.id}
              active={activeTab === t.id}
              onClick={() => {
                scrollToAnchor(t.id);
                setActiveTab(t.id);
              }}
            >
              {t.title}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={`${styles.menuItems} custom-scroll pt-5`}>
        {tabs.map((t) => (
          <BurgerIngredientSection
            key={t.id}
            title={t.title}
            ingredients={ingredients.filter((i) => i.type === t.id)}
            innerRef={(el) => (ingredientsHeadings.current[t.id] = el)}
          />
        ))}
      </div>
    </section>
  );
};
