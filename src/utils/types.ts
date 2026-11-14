export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TAddIngredientPayload = {
  id: string;
  type: string;
};

export type ISelectedIngredient = {
  uuid: string;
  ingredient: TIngredient | undefined;
};

export type TCreateOrderMutation = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
