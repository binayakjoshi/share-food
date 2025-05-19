import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { Meal, MealDB } from "@/components/meals/meal-type";
const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (slug: string) => {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export const saveMeal = async (meal: Meal) => {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;
  const filePath = `public/images/${fileName}`;
  const stream = fs.createWriteStream(filePath);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  const mealToSave: MealDB = {
    title: meal.title,
    slug,
    instructions,
    image: `/images/${fileName}`,
    creator: meal.creator,
    summary: meal.summary,
    creator_email: meal.creator_email,
  };

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(mealToSave);
};
