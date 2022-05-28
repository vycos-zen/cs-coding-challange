export const fetchFoods = async (token: string) => {
  try {
    const foodsRes = await fetch(`/api/foods`, {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    const foodData = await foodsRes.json();

    return foodData;
  } catch (error) {
    console.error(error);
  }
};
