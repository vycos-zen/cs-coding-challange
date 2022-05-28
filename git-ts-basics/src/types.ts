export enum PokemonType {
  GRASS = "grass",
  WATER = "water",
  FIRE = "fire",
  POISION = "poision",
}

export type Champion = {
  name: string;
  age: number;
};
export interface Pokemon {
  type: PokemonType[];
  name: string;
}
