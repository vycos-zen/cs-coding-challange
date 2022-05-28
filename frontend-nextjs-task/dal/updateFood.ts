import { FoodEntry } from "../schema/FoodEntryTypes";

export const updateFood = async (token: string, food: FoodEntry) => {
  try {
    await fetch(`http://127.0.0.1:5000/food/?id=${food.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...food }),
    });
  } catch (error) {
    console.error(error);
  }
};
