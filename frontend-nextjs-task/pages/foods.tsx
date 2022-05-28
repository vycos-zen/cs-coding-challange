import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";
import { FoodEntry } from "../schema/FoodEntryTypes";
import { Card, Grid, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { AddOrUpdateFoodComponent } from "../components/AddOrUpdateFoodComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { fetchFoods } from "../dal/fetchFoods";
import { deleteFood } from "../dal/deleteFood";
import styles from "../styles/Foods.module.scss";

const FoodsPage: NextPage = () => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

  const [foodData, setFoodData] = React.useState<FoodEntry[]>([]);

  const [addNewFood, setAddNewFood] = React.useState<boolean>(false);

  const handleEditToggle = () => {
    setAddNewFood(!addNewFood);
  };

  React.useEffect(() => {
    const fetchFoodData = async () => {
      if (!userContext.token || userContext.token.length === 0) {
        router.push("/login");
        return;
      }
      setFoodData(await fetchFoods(userContext.token));
    };
    fetchFoodData();
  }, [userContext.token, addNewFood]);

  return (
    <article className={styles.container}>
      <Grid direction="row" wrap="wrap" container spacing={2}>
        {addNewFood ? (
          <AddOrUpdateFoodComponent toggleAddOrEdit={handleEditToggle} />
        ) : (
          <div
            className={styles.addfood}
            onClick={() => {
              handleEditToggle();
            }}
          >
            <AddCircleIcon />
          </div>
        )}
        {foodData.length > 0 ? (
          foodData.map((food) => (
            <Card className={styles.foodcard} key={food.id} elevation={6}>
              <Stack direction="row">
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  {food.name}
                </Typography>
                <div
                  className={styles.updatefood}
                  onClick={async (e) => {
                    router.push(`/foods/${food.id}`);
                  }}
                >
                  <InfoOutlinedIcon />
                </div>
                <div
                  className={styles.deletefood}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!userContext.token || userContext.token.length === 0) {
                      router.push("/login");
                      return;
                    }
                    await deleteFood(userContext.token, food.id);
                    setFoodData(await fetchFoods(userContext.token));
                  }}
                >
                  <DeleteForeverOutlinedIcon />
                </div>
              </Stack>
            </Card>
          ))
        ) : (
          <Typography variant="h4" className={styles.nofood} sx={{ flexGrow: 1 }}>
            ...looks like we could add some food...
          </Typography>
        )}
      </Grid>
    </article>
  );
};

export default FoodsPage;
