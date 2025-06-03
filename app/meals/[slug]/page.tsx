import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { type MealDB as MealType } from "@/components/meals/meal-type";
import classes from "./page.module.css";
import { notFound } from "next/navigation";
type MealDetailProps = {
  params: Promise<{ slug: string }>;
};
export const generateMetadata = async ({ params }: MealDetailProps) => {
  const { slug } = await params;

  const meal = (await getMeal(slug)) as MealType;
  if (!meal) notFound();
  return {
    title: meal.title,
    description: meal.summary,
  };
};
const MealDetail = async ({ params }: MealDetailProps) => {
  const { slug } = await params;

  const meal = (await getMeal(slug)) as MealType;

  if (!meal) {
    notFound();
  }

  const formattedInstructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            alt={meal.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        <div
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: formattedInstructions }}
        />
      </main>
    </>
  );
};

export default MealDetail;
