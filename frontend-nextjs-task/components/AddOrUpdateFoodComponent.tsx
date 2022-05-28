import { Card, Stack, TextField } from "@mui/material";
import router from "next/router";
import React from "react";
import { UserContext } from "../context/UserContext";
import { fetchFoods } from "../dal/fetchFoods";
import { submitFood } from "../dal/submitFood";
import { FoodEntryDetails } from "../schema/FoodEntryTypes";
import styles from "../styles/Foods.module.scss";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AddOrUpdateFoodComponentProps } from "../interface/AddFoodComponentProps";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { updateFood } from "../dal/updateFood";

export const AddOrUpdateFoodComponent: React.FC<AddOrUpdateFoodComponentProps> = ({ ...props }) => {
  const userContext = React.useContext(UserContext);

  const [foodName, setFoodName] = React.useState<string>("");
  const [foodDetail, setFoodDetail] = React.useState<FoodEntryDetails>({});

  React.useEffect(() => {
    if (props.food) {
      setFoodName(props.food.name);
    }
  }, []);

  return (
    <Card className={styles.foodcard} elevation={6}>
      <Stack direction="row">
        <TextField
          sx={{ flexGrow: 1 }}
          label="Food Name"
          variant="filled"
          focused
          type="text"
          value={foodName}
          required
          size="small"
          onChange={(event) => {
            event.preventDefault();
            setFoodName(event.target.value);
          }}
        />
        <div
          className={styles.submitfood}
          onClick={async () => {
            if (!userContext.token || userContext.token.length === 0) {
              router.push("/login");
              return;
            }

            if (props.food) {
              await updateFood(userContext.token, { ...props.food, name: foodName });
            } else {
              await submitFood(userContext.token, { name: foodName, details: foodDetail });
            }

            props.toggleAddOrEdit();
            setFoodName("");
            setFoodDetail({});
          }}
        >
          <SendOutlinedIcon />
        </div>
        <div
          className={styles.canceledit}
          onClick={async () => {
            props.toggleAddOrEdit();
          }}
        >
          <CancelOutlinedIcon />
        </div>
      </Stack>
    </Card>
  );
};
