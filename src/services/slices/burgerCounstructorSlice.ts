import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { TAddIngredientPayload } from '@utils/types';

type ISelectedIngredientInfo = {
  uuid: string;
  id: string;
};

type TInitialState = {
  bun: string | null;
  ingredients: ISelectedIngredientInfo[];
};

const initialState: TInitialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TAddIngredientPayload>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload.id;
      } else {
        state.ingredients = [
          ...state.ingredients,
          { uuid: nanoid(), id: action.payload.id },
        ];
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((e) => e.uuid !== action.payload);
    },
    sortIngredients: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const fromIngredient = state.ingredients[fromIndex];
      const toIngredient = state.ingredients[toIndex];

      if (fromIngredient && toIngredient) {
        state.ingredients.splice(fromIndex, 1);
        state.ingredients.splice(toIndex, 0, fromIngredient);
      }
    },
    resetCart: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
  selectors: {
    getBunSelector: (state) => state.bun,
    getIngredientsSelector: (state) => state.ingredients,
  },
});

export const { addIngredient, removeIngredient, sortIngredients, resetCart } =
  burgerConstructorSlice.actions;
export const { getBunSelector, getIngredientsSelector } =
  burgerConstructorSlice.selectors;
