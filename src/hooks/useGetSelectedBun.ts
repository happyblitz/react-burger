import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { getBunSelector } from '@/services/slices/burgerCounstructorSlice';

import { useAppSelector } from './useAppSelector';

import type { TIngredient } from '@/utils/types';

export const useGetSelectedBun = (): TIngredient | undefined => {
  const bunId = useAppSelector(getBunSelector);
  const { bun } = useGetIngredientsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      bun: data?.find((i) => i._id === bunId),
    }),
  });
  return bun;
};
