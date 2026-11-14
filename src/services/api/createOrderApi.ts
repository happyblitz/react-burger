import { BASE_API_URL } from '@/utils/globals';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TCreateOrderMutation } from '@/utils/types';

export const orderApi = createApi({
  reducerPath: 'order',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL + 'orders',
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<TCreateOrderMutation, string[]>({
      query: (ingredients) => ({
        url: '',
        method: 'POST',
        body: {
          ingredients,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
