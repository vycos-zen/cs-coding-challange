import { Champion, Pokemon, PokemonType } from "./types";

const calculatePockemonWinner = (odds: number) => {
  return getRandomInt(0, 100) < odds;
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const winningOdds = 70;
const loosingOdds = 30;
const evenOdds = 50;
export class Arena {
  protected champion: Champion;

  constructor(
    champion: Champion,
    private pokemon: Pokemon,
    private enemyPokemon: Pokemon
  ) {
    this.champion = champion;
  }

  public getMyPockemonName() {
    return this.pokemon.name;
  }

  public getEnemyPockemonName() {
    return this.enemyPokemon.name;
  }

  public startArenaFight = (): boolean => {
    return this.wouldMyPokemonWinInAFight(this.pokemon, this.enemyPokemon);
  };

  private wouldMyPokemonWinInAFight(
    pokemon: Pokemon,
    enemyPokemon: Pokemon
  ): boolean {
    //grass > water > fire > grass
    for (const pokemonType of pokemon.type) {
      switch (pokemonType) {
        case PokemonType.GRASS: {
          if (enemyPokemon.type.some((type) => type === PokemonType.WATER)) {
            return calculatePockemonWinner(winningOdds);
          } else if (
            enemyPokemon.type.some((type) => type === PokemonType.FIRE)
          ) {
            return calculatePockemonWinner(loosingOdds);
          }
        }
        case PokemonType.WATER: {
          if (enemyPokemon.type.some((type) => type === PokemonType.FIRE)) {
            return calculatePockemonWinner(winningOdds);
          } else if (
            enemyPokemon.type.some((type) => type === PokemonType.GRASS)
          ) {
            return calculatePockemonWinner(loosingOdds);
          }
        }
        case PokemonType.FIRE: {
          if (enemyPokemon.type.some((type) => type === PokemonType.GRASS)) {
            return calculatePockemonWinner(winningOdds);
          } else if (
            enemyPokemon.type.some((type) => type === PokemonType.WATER)
          ) {
            return calculatePockemonWinner(loosingOdds);
          }
        }
        default: {
          return calculatePockemonWinner(evenOdds);
        }
      }
    }
    return true;
  }
}
