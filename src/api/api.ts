import { BASE_API_URL } from '@utils/globals';

import type { TIngredient } from '@/utils/types';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export async function getIngredients(): Promise<TIngredient[] | false> {
  try {
    const response = await fetch(BASE_API_URL);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = (await response.json()) as TIngredientsResponse;
    return data.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error('Произошла неизвестная ошибка', e);
    }
  }

  return false;
}
