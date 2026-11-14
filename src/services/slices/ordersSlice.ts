import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type IInitialState = {
  currentOrderId: number | null;
};

const initialState: IInitialState = {
  currentOrderId: null,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    currentOrder: (state, action: PayloadAction<number>) => {
      state.currentOrderId = action.payload;
    },
  },
  selectors: {
    currentOrderSelector: (state) => state.currentOrderId,
  },
});

export const { currentOrder } = orderSlice.actions;
export const { currentOrderSelector } = orderSlice.selectors;
