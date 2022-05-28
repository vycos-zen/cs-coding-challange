import { Beer } from "../model/Beer";
import beers from "../data/beers.json";
import { BeersByBrand } from "../model/BeersByBrand";
import { BeerPricesByBrand } from "../model/BeerPricesByBrand";

const fetchData = async () => {
  const beerData: Beer[] = JSON.parse(JSON.stringify(beers));
  return beerData;
};

const groupBeersByBrand = (beers: Beer[]) => {
  return beers.reduce((prev: BeersByBrand[], currentBeer) => {
    let brand: BeersByBrand | undefined = prev.find(
      (beer) => beer.brand === currentBeer.brand
    );

    !brand
      ? prev.push({ brand: currentBeer.brand, beers: [currentBeer.id] })
      : brand.beers?.push(currentBeer.id);

    return prev;
  }, []);
};

const filterBeersByType = (type: string, beers: Beer[]) => {
  return beers
    .filter((beer) => beer.type === type)
    .map((beer) => {
      return beer.id;
    });
};

const getAvaragePrice = (prices: number[]) => {
  const sum = prices.reduce((prev, current) => prev + current, 0);
  return sum / prices.length;
};

const findCheepestBeerBrand = (beers: Beer[]) => {
  const beerBrandsWithPrices = beers.reduce(
    (prev: BeerPricesByBrand[], currentBeer) => {
      let brand: BeerPricesByBrand | undefined = prev.find(
        (beer) => beer.brand === currentBeer.brand
      );

      !brand
        ? prev.push({
            brand: currentBeer.brand,
            beerPrices: [+currentBeer.price],
          })
        : brand.beerPrices?.push(+currentBeer.price);

      return prev;
    },
    []
  );

  let cheepestBeerBrand: string | undefined = undefined;
  let lowestAvarage: number = 0;

  beerBrandsWithPrices.map((brandWithBeerPrices) => {
    brandWithBeerPrices.avarage = getAvaragePrice(
      brandWithBeerPrices.beerPrices
    );
    if (!cheepestBeerBrand) {
      cheepestBeerBrand = brandWithBeerPrices.brand;
      lowestAvarage = brandWithBeerPrices.avarage;
    } else if (brandWithBeerPrices.avarage < lowestAvarage) {
      cheepestBeerBrand = brandWithBeerPrices.brand;
      lowestAvarage = brandWithBeerPrices.avarage;
    }
  });

  return cheepestBeerBrand;
};

const beerIdsWithExludedIngiridents = (
  infredientToExclude: string,
  beers: Beer[]
) => {
  return beers
    .filter((beer) =>
      beer.ingredients.some(
        (ingredient) =>
          //assuming all beer ingredient list have the excluded ingredient with ratio of 0
          ingredient.name === infredientToExclude && +ingredient.ratio === 0
      )
    )
    .map((beer) => {
      return beer.id;
    });
};

const getWaterRatioOfBeer = (beer: Beer) => {
  const waterRatio = beer.ingredients.reduce((prev, current) => {
    prev += +current.ratio;
    return prev;
  }, 0);
  return 1 - waterRatio;
};

const descendingOrderedBeersbyWaterRatio = (beers: Beer[]) => {
  return beers
    .sort((beerA, beerB) => {
      const beerARatio = getWaterRatioOfBeer(beerA);
      const beerBRatio = getWaterRatioOfBeer(beerB);
      let compareResult = beerARatio - beerBRatio;
      if (compareResult === 0) {
        if (beerA.name < beerB.name) {
          compareResult = 1;
        }
        if (beerA.name > beerB.name) {
          compareResult = -1;
        }
      }
      return compareResult;
    })
    .reverse()
    .map((beer) => {
      return beer.id;
    });
};

const orderedMapByNearesHundred = (beers: Beer[]) => {
  const beerMap = new Map<string, string[]>();

  beers.map((beer) => {
    const beerPrice = (Math.ceil(+beer.price / 100) * 100).toString();
    const beerIds = beerMap.get(beerPrice) ?? [];
    beerMap.set(beerPrice, [...beerIds, beer.id]);
  });

  return [...beerMap];
};

export const getSourceBeerData = async () => {
  return await fetchData();
};

export const getBeersByBrand = async () => {
  return groupBeersByBrand(await getSourceBeerData());
};

export const getBeerIdsByType = async (type: string) => {
  return filterBeersByType(type, await getSourceBeerData());
};

export const getCheepestBeer = async () => {
  return findCheepestBeerBrand(await getSourceBeerData());
};

export const getIngridientExcludedBeerIds = async (ingredient: string) => {
  return beerIdsWithExludedIngiridents(ingredient, await getSourceBeerData());
};

export const getBeersDescendingByWaterRatio = async () => {
  return descendingOrderedBeersbyWaterRatio(await getSourceBeerData());
};

export const getOrderedBeerMapByNearestHundred = async () => {
  return orderedMapByNearesHundred(await getSourceBeerData());
};
