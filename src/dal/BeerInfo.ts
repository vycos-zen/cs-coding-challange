import { Beer } from "../model/Beer";
import beers from "../data/beers.json";
import { BeersByBrand } from "../model/BeersByBrand";

const fetchData = async () => {
  const beerData: Beer[] = JSON.parse(JSON.stringify(beers));
  return beerData;
};

const groupBeersByBrand = (beers: Array<Beer>) => {
  return beers.reduce((prev: BeersByBrand[], currentBeer) => {
    let brand: BeersByBrand | undefined = prev.find(
      (beer) => beer.brand === currentBeer.brand
    );

    !brand
      ? prev.push({ brand: currentBeer["brand"], beers: [currentBeer.name] })
      : brand.beers?.push(currentBeer.name);

    return prev;
  }, []);
};

export const getFullBeerData = async () => {
  return await fetchData();
};

export const getBeersByBrand = async () => {
  return groupBeersByBrand(await getFullBeerData());
};
