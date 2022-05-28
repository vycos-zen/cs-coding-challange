import { Ingredient } from "./Ingredient";

export type Beer = {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: string;
  alcohol: string;
  ingredients: Ingredient[];
};
