import { FoodEntry } from "../schema/FoodEntryTypes";

export interface AddOrUpdateFoodComponentProps {
  toggleAddOrEdit: () => void;
  food?: FoodEntry;
}
