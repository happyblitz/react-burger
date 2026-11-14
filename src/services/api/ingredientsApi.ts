import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_API_URL } from '@utils/globals';

import type { TIngredient } from '@/utils/types';

type apiResponse = {
  data: TIngredient[];
  success: boolean;
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredients',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => '/ingredients',
      transformResponse: (response: apiResponse) => {
        if (response.success !== true) {
          throw new Error('невалидный ответ от сервера');
        }

        return response.data;
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
