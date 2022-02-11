import {
  getBeerIdsByType,
  getBeersByBrand,
  getBeersDescendingByWaterRatio,
  getCheepestBeer,
  getIngridientExcludedBeerIds,
} from "./dal/BeerInfo";

console.log("ready, set, initiate!");

const getBeerQueries = async () => {
  const beersByBrand = await getBeersByBrand();
  //console.log(JSON.stringify(beersByBrand));
  const beerIdsByType = await getBeerIdsByType("Brown");
  //console.log(JSON.stringify(beerIdsByType));
  const cheepestBeer = await getCheepestBeer();
  //console.log(JSON.stringify(cheepestBeer));
  const ingridientExcludedBeerIds = await getIngridientExcludedBeerIds(
    "barley"
  );
  //console.log(JSON.stringify(ingridientExcludedBeerIds));
  const beersDescendingByWaterRatio = await getBeersDescendingByWaterRatio();
  console.log(JSON.stringify(beersDescendingByWaterRatio));
};

getBeerQueries();
