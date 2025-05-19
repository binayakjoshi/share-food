"use client";
import ImagePicker from "@/components/meals/image-picker";
import { useActionState } from "react";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/action";
import { MealFormSubmit } from "@/components/meals/meal-form-submit";
const ShareMealPage = () => {
  const [state, formAction] = useActionState(shareMeal, { message: "" });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instruction">Instructions</label>
            <textarea
              id="instruction"
              name="instruction"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker name="image" label="your image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
};
export default ShareMealPage;
