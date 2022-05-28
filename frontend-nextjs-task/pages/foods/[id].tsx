import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Card, Stack, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { AddOrUpdateFoodComponent } from "../../components/AddOrUpdateFoodComponent";
import { UserContext } from "../../context/UserContext";
import { FoodEntry } from "../../schema/FoodEntryTypes";
import { deleteFood } from "../../dal/deleteFood";
import { fetchFoodById } from "../../dal/fetchFoodById";
import styles from "../../styles/Foods.module.scss";

const FoodDetail: NextPage = () => {
  const userContext = React.useContext(UserContext);
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const foodId = typeof id === "string" ? (id as string) : "";

  const [food, setFood] = React.useState<FoodEntry>({ id: foodId, name: "", createdAt: new Date() });

  const [foodEditActive, setFoodEditActive] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userContext.token || userContext.token.length === 0) {
        router.push("/login");
        return;
      }
      setFood(await fetchFoodById(userContext.token, foodId));
    };

    fetchData();
  }, [foodId, foodEditActive]);

  const handleEditToggle = () => {
    setFoodEditActive(!foodEditActive);
  };

  return (
    <article className={styles.container}>
      {foodEditActive ? (
        <AddOrUpdateFoodComponent toggleAddOrEdit={handleEditToggle} food={food} />
      ) : (
        <Card className={styles.foodcard} key={food?.id} elevation={6}>
          <Stack direction="row">
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              {food?.name}
            </Typography>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {food?.details}
            </Typography>

            <div
              className={styles.updatefood}
              onClick={async (e) => {
                e.preventDefault();
                if (food) {
                  setFoodEditActive(!foodEditActive);
                }
              }}
            >
              <EditOutlinedIcon />
            </div>
            <div
              className={styles.deletefood}
              onClick={async (e) => {
                e.preventDefault();
                if (food) {
                  await deleteFood(userContext.token, food.id);
                  router.push("/foods");
                }
              }}
            >
              <DeleteForeverOutlinedIcon />
            </div>
          </Stack>
        </Card>
      )}
    </article>
  );
};

export default FoodDetail;
