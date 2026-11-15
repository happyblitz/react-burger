import { configureStore } from '@reduxjs/toolkit';

import { orderApi } from './api/createOrderApi';
import { ingredientsApi } from './api/ingredientsApi';
import { burgerConstructorSlice } from './slices/burgerCounstructorSlice';
import { modalSlice } from './slices/modalSlice';
import { orderSlice } from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [modalSlice.reducerPath]: modalSlice.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
