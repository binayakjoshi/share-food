export type Meal = {
  title: string;
  instructions: string;
  image: File;
  creator: string;
  summary: string;
  creator_email: string;
};

export type MealDB = {
  id?: string;
  title: string;
  slug: string;
  instructions: string;
  image: string; // image path
  creator: string;
  summary: string;
  creator_email: string;
};
