export const deleteFood = async (token: string, foodId: string) => {
  try {
    // calling the api directly due to error with trailing slash on redirect
    await fetch(`http://127.0.0.1:5000/food/?id=${foodId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
