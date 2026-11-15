import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

import { BurgerIngredientSection } from '../burger-ingredient-section/burger-ingredient-section';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('bun');
  const ingredientsHeadings = useRef<Record<string, HTMLElement | null>>({});
  const ingridientsContainerRef = useRef<HTMLElement | null>(null);

  const { data: ingredients } = useGetIngredientsQuery();

  const scrollToAnchor = (activeTabId: string): void => {
    const ingredientsHeadingElement = ingredientsHeadings.current[activeTabId];

    if (ingredientsHeadingElement) {
      ingredientsHeadingElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Устанавливаем активную вкладку на основе ближайшей видимой вкладки
  const handleScroll = (): void => {
    if (ingridientsContainerRef.current) {
      const containerRect = ingridientsContainerRef.current.getBoundingClientRect();

      const closestTab = Object.entries(ingredientsHeadings.current).reduce<{
        tabKey: string | null;
        distance: number | null;
      }>(
        (acc, [headingKey, headingRef]) => {
          if (headingRef) {
            const headingRect = headingRef.getBoundingClientRect();
            const distance = Math.abs(headingRect.top - containerRect.top);
            const isVisible =
              headingKey === activeTab ||
              (containerRect.top < headingRect.top &&
                containerRect.bottom > headingRect.top);

            if (isVisible && (acc.distance === null || distance < acc.distance)) {
              return { tabKey: headingKey, distance };
            }
          }
          return acc;
        },
        { tabKey: null, distance: null }
      );

      const closestTabKey = closestTab.tabKey;
      if (closestTabKey && closestTabKey !== activeTab) {
        setActiveTab(closestTabKey);
      }
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
    <section className={styles.burger_ingredients} ref={ingridientsContainerRef}>
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
      <div className={`${styles.menuItems} custom-scroll pt-5`} onScroll={handleScroll}>
        {ingredients &&
          tabs.map((t) => (
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
