import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
import { type MealDB as meal } from "./meal-type";

type MealsGridProps = {
  meals: meal[];
};
const MealsGrid = ({ meals }: MealsGridProps) => {
  if (!meals || meals.length === 0) return <p>No meals available.</p>;

  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};
export default MealsGrid;
