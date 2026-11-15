import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TInitialState = {
  openModalType: null | 'ingredientInfo' | 'orderInfo';
  ingredientId: null | string;
};

const initialState: TInitialState = {
  openModalType: null,
  ingredientId: null,
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openIngredientInfoModal: (state, action: PayloadAction<number | string>) => {
      state.openModalType = 'ingredientInfo';
      state.ingredientId = String(action.payload);
    },
    closeModal: (state) => {
      state.openModalType = null;
      state.ingredientId = null;
    },
  },
  selectors: {
    modalIngredientInfoSelector: (state) =>
      state.openModalType === 'ingredientInfo' && state.ingredientId
        ? state.ingredientId
        : false,
    modalOrderInfoSelector: (state) => state.openModalType === 'orderInfo',
  },
});

export const { openIngredientInfoModal, closeModal } = modalSlice.actions;
export const { modalIngredientInfoSelector, modalOrderInfoSelector } =
  modalSlice.selectors;
