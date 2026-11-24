import { createAsyncThunk } from '@reduxjs/toolkit';

import { isTokenExists } from '@utils/token.js';

import { authApi } from '../api/authApi';
import { setIsAuthChecked } from '../slices/userSlice';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, thunkApi) => {
    try {
      if (isTokenExists()) {
        await thunkApi.dispatch(
          authApi.endpoints.getUser.initiate(undefined, { forceRefetch: true })
        );
      }
    } finally {
      thunkApi.dispatch(setIsAuthChecked(true));
    }
  }
);
