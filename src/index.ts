import { getBeerIdsByType, getBeersByBrand } from "./dal/BeerInfo";

console.log("ready, set, initiate!");

const getBeerQueries = async () => {
  const beersByBrand = await getBeersByBrand();
  //console.log(JSON.stringify(beersByBrand));
  const beerIdsByType = await getBeerIdsByType("Brown");
  console.log(JSON.stringify(beerIdsByType));
};

getBeerQueries();
