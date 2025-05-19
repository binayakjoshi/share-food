"use server";

import { Meal } from "@/components/meals/meal-type";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const shareMeal = async (
  previousState: { message: string },
  formData: FormData
) => {
  const title = formData.get("title");
  const summary = formData.get("summary");
  const instructions = formData.get("instruction");
  const image = formData.get("image");
  const creator = formData.get("name");
  const creator_email = formData.get("email");

  if (
    typeof title !== "string" ||
    typeof summary !== "string" ||
    typeof instructions !== "string" ||
    !(image instanceof File) ||
    typeof creator !== "string" ||
    typeof creator_email !== "string"
  ) {
    return { message: "invalid Data passed" };
  }

  const isInvalidText = (text: string) => {
    return !text || text.trim() === "";
  };
  const meal: Meal = {
    title,
    summary,
    instructions,
    image,
    creator,
    creator_email,
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  )
    return { message: "invalid Data passed" };

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
