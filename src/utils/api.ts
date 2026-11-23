import { CustomError } from './CustomError';
import { BASE_API_URL } from './globals';

import type { TUnknownRecord } from './types';
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react';

type TRefreshRequestResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

type TBaseQueryOptions = {
  baseUrl?: string;
};

const defaultRequestOptions = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
};

async function request(
  url: string,
  extraOptions: Record<string, unknown> = {}
): Promise<unknown> {
  const body =
    'body' in extraOptions
      ? typeof extraOptions.body === 'string'
        ? { body: extraOptions.body }
        : { body: JSON.stringify(extraOptions.body) }
      : {};

  const options = {
    ...defaultRequestOptions,
    ...extraOptions,
    ...body,
    headers: {
      ...defaultRequestOptions.headers,
      ...('headers' in extraOptions && typeof extraOptions.headers === 'object'
        ? extraOptions.headers
        : {}),
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as unknown;

  if (!response.ok) {
    const error = new CustomError({ status: response.status, data });
    throw error;
  }

  return data;
}

async function refreshToken(): Promise<TRefreshRequestResponse> {
  const refreshData = (await request(BASE_API_URL + 'auth/token', {
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })) as TRefreshRequestResponse;

  if (refreshData.success) {
    localStorage.setItem('accessToken', refreshData.accessToken);
    localStorage.setItem('refreshToken', refreshData.refreshToken);
  }

  return refreshData;
}

async function fetchWithRefresh(
  url: string,
  options: Record<string, unknown>
): Promise<TUnknownRecord> {
  try {
    return (await request(url, options)) as Promise<TUnknownRecord>;
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      (error.status === 401 || error.status === 403) &&
      localStorage.getItem('refreshToken')
    ) {
      const refreshData = await refreshToken();

      return (await request(url, {
        ...options,
        headers: {
          ...('headers' in options && typeof options.headers === 'object'
            ? options.headers
            : {}),
          authorization: refreshData.accessToken,
        },
      })) as Promise<TUnknownRecord>;
    } else {
      throw error;
    }
  }
}

export const baseQueryWithRefresh = (
  baseQueryOptions: TBaseQueryOptions = {}
): BaseQueryFn<
  string | FetchArgs,
  unknown,
  { status: number | string; data: unknown }
> => {
  return async (args) => {
    const { url, ...rest } = typeof args === 'string' ? { url: args } : args;

    const fullUrl = (baseQueryOptions.baseUrl ?? '') + url;

    const token = localStorage.getItem('accessToken');

    const options = {
      ...rest,
      headers: {
        ...(token ? { Authorization: token } : {}),
        ...rest.headers,
      },
    };

    try {
      const data = await fetchWithRefresh(fullUrl, options);
      return { data };
    } catch (e) {
      const error = e as { status?: number | string; data?: unknown; message?: string };
      return {
        error: {
          status: error.status ?? 'unknown status',
          data: error.data ?? error.message ?? 'Произошла непредвиденна ошибка',
        },
      };
    }
  };
};
