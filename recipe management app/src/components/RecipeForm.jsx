import { useState } from "react";

const emptyRecipe = {
  title: "",
  description: "",
  category: "",
  cuisine: "",
  difficulty: "Easy",
  image: "",
  time: "",
  servings: "",
  restTime: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeForm({ initialValues = {}, onSubmit, onCancel }) {
  const [recipe, setRecipe] = useState(() => ({
    ...emptyRecipe,
    ...initialValues,
    time: initialValues.time ?? "",
    servings: initialValues.servings ?? "",
    ingredients: Array.isArray(initialValues.ingredients)
      ? initialValues.ingredients.join("\n")
      : initialValues.ingredients ?? "",
    instructions: Array.isArray(initialValues.instructions)
      ? initialValues.instructions.join("\n")
      : initialValues.instructions ?? "",
  }));

  function handleChange(event) {
    const { name, value } = event.target;
    setRecipe((currentRecipe) => ({ ...currentRecipe, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...recipe,
      title: recipe.title.trim(),
      category: recipe.category.trim(),
      cuisine: recipe.cuisine.trim(),
      description: recipe.description.trim(),
      time: Number(recipe.time),
      servings: Number(recipe.servings),
      restTime: recipe.restTime.trim(),
      ingredients: recipe.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: recipe.instructions
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <label>
        Recipe name
        <input
          name="title"
          value={recipe.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Category
        <input
          name="category"
          value={recipe.category}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Cuisine
        <input
          name="cuisine"
          value={recipe.cuisine}
          onChange={handleChange}
          placeholder="e.g. Indian, Italian, Japanese"
        />
      </label>

      <label>
        Difficulty
        <select
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Advanced</option>
        </select>
      </label>

      <label>
        Image URL
        <input
          name="image"
          type="url"
          value={recipe.image}
          onChange={handleChange}
        />
      </label>

      <label>
        Prep &amp; cook time (minutes)
        <input
          name="time"
          type="number"
          min="1"
          step="1"
          value={recipe.time}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Servings
        <input
          name="servings"
          type="number"
          min="1"
          step="1"
          value={recipe.servings}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          rows="4"
          required
        />
      </label>

      <label>
        Ingredients <span className="field-hint">One ingredient per line</span>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          rows="5"
          placeholder={"2 cups flour\n1 cup milk"}
          required
        />
      </label>

      <label>
        Instructions <span className="field-hint">One step per line</span>
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          rows="6"
          placeholder={"Preheat the oven.\nMix the ingredients."}
          required
        />
      </label>

      <label>
        Rest or chill time <span className="field-hint">Optional</span>
        <input
          name="restTime"
          value={recipe.restTime}
          onChange={handleChange}
          placeholder="e.g. Chill for at least 4 hours"
        />
      </label>

      <div className="recipe-form-actions">
        <button className="button-primary" type="submit">
          {initialValues.id ? "Save changes" : "Save recipe"}
        </button>
        {onCancel && (
          <button className="button-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}