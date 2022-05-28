import { Arena } from "./src/arena";
import { Champion, Pokemon, PokemonType } from "./src/types";

console.log("start");
// {} = Object
// [] = Array
const ash: Champion = {
  age: 14,
  name: "Ash Ketchum",
};
const charizard: Pokemon = {
  name: "Charizard",
  type: [PokemonType.FIRE],
};
const blastoise: Pokemon = {
  name: "Blastoise",
  type: [PokemonType.WATER],
};
const venosaur: Pokemon = {
  name: "Venosaur",
  type: [PokemonType.GRASS, PokemonType.POISION],
};

const arena = new Arena(ash, venosaur, blastoise);

const sayMyName = (champ: Champion): void => {
  console.log(`My name is: ${champ.name}`);
};

const simulateArenaGames = (numberOfGames: number): void => {
  sayMyName(ash);
  let myPockemonWinCounter = 0;
  for (let i = 0; i < numberOfGames; i++) {
    console.log(`Round: #${i + 1}`);
    if (arena.startArenaFight()) {
      myPockemonWinCounter++;
      console.log(`winner is my pockemon: ${arena.getMyPockemonName()}`);
    } else {
      console.log(`winner is enemy pockemon: ${arena.getEnemyPockemonName()}`);
    }
  }
  console.log(
    `my pockemon: ${arena.getMyPockemonName()} won ${myPockemonWinCounter}/${numberOfGames} games. with ${
      (100 * myPockemonWinCounter) / numberOfGames
    }% success rate`
  );
};

simulateArenaGames(100);
