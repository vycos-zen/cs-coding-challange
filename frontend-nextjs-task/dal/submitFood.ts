import { FoodEntryCreateOptions } from "../schema/FoodEntryTypes";

export const submitFood = async (token: string, food: FoodEntryCreateOptions) => {
  try {
    await fetch(`/api/foods`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: food.name, ...food.details }),
    });
  } catch (error) {
    console.error(error);
  }
};
