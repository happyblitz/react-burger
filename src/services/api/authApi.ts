import { baseQueryWithRefresh } from '@/utils/api';
import { BASE_API_URL } from '@/utils/globals';
import { createApi } from '@reduxjs/toolkit/query/react';

import type { TUser } from '@/utils/types';

type TAuthorization = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

type TInfo = {
  success: boolean;
  message: string;
};

type TEmail = {
  email: string;
};

type TPassword = {
  password: string;
};

type TGetUser = {
  success: boolean;
  user: TUser;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<TUser, Record<string, string>>({
      query: (credentials) => ({
        url: 'auth/register',
        body: credentials,
      }),
      transformResponse: (response: TAuthorization) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response.user;
      },
    }),
    login: builder.mutation<TUser, Record<string, string>>({
      query: (credentials) => ({
        url: 'auth/login',
        body: credentials,
      }),
      transformResponse: (response: TAuthorization) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response.user;
      },
    }),
    logout: builder.mutation<TInfo, void>({
      query: () => ({
        url: 'auth/logout',
        body: { token: localStorage.getItem('refreshToken') },
      }),
      transformResponse: (response: TInfo) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return response;
      },
    }),
    forgotPassword: builder.mutation<TInfo, TEmail>({
      query: (credentials) => ({
        url: 'password-reset',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<TInfo, TPassword>({
      query: (credentials) => ({
        url: 'password-reset/reset',
        body: credentials,
      }),
    }),
    getUser: builder.query<TUser, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
      transformResponse: (response: TGetUser) => response.user,
    }),
    updateUser: builder.mutation<TUser, Record<string, string>>({
      query: (credentials) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: credentials,
      }),
      transformResponse: (response: TGetUser) => response.user,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = authApi;
