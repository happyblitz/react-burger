import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { getBunSelector } from '@/services/slices/burgerCounstructorSlice';
import { useSelector } from 'react-redux';

import type { TIngredient } from '@/utils/types';

export const useGetSelectedBun = (): TIngredient | undefined => {
  const bunId = useSelector(getBunSelector);
  const { bun } = useGetIngredientsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      bun: data?.find((i) => i._id === bunId),
    }),
  });
  return bun;
};
