import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { getIngredientsSelector } from '@/services/slices/burgerCounstructorSlice';
import { useMemo } from 'react';

import { useAppSelector } from './useAppSelector';

import type { ISelectedIngredient } from '@/utils/types';

export const useGetSelectedIngredients = (): ISelectedIngredient[] => {
  const selectedIngredients = useAppSelector(getIngredientsSelector);
  const { data: ingredients = [] } = useGetIngredientsQuery();

  return useMemo(() => {
    if (!selectedIngredients.length) {
      return [];
    }

    return selectedIngredients.map(({ uuid, id }) => ({
      uuid,
      ingredient: ingredients.find((i) => i._id === id),
    }));
  }, [selectedIngredients, ingredients]);
};
