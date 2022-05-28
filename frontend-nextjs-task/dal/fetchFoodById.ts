export const fetchFoodById = async (token: string, id: string) => {
  try {
    // calling the api directly due to error with trailing slash on redirect
    const foodRes = await fetch(`http://127.0.0.1:5000/food/?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    const foodData = await foodRes.json();
    return foodData;
  } catch (error) {
    console.error(error);
  }
};
