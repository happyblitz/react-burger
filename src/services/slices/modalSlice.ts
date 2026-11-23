import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TInitialState = {
  type: null | string;
};

const initialState: TInitialState = {
  type: null,
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.type = null;
    },
  },
  selectors: {
    modalTypeSelector: (state) => state.type,
  },
});

export const { closeModal } = modalSlice.actions;
export const { modalTypeSelector } = modalSlice.selectors;
