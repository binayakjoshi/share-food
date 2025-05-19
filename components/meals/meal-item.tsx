import Link from "next/link";
import Image from "next/image";
import { type MealDB as meal } from "./meal-type";
import classes from "./meal-item.module.css";

type mealItemProps = meal;

const MealItem = async ({
  title,
  slug,
  image,
  summary,
  creator,
}: mealItemProps) => {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};
export default MealItem;
