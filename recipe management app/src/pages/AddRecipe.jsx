import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipes } from "../context/RecipeContext";

export default function AddRecipe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { recipes, addRecipe, updateRecipe } = useRecipes();
  const existingRecipe = id
    ? recipes.find((recipe) => String(recipe.id) === id)
    : null;

  function handleSaveRecipe(recipe) {
    if (existingRecipe) {
      updateRecipe(existingRecipe.id, recipe);
      navigate(`/recipe/${encodeURIComponent(String(existingRecipe.id))}`);
      return;
    }

    const createdRecipe = addRecipe(recipe);
    navigate(`/recipe/${encodeURIComponent(String(createdRecipe.id))}`);
  }

  if (id && !existingRecipe) {
    return (
      <main className="page">
        <div className="empty-state">
          <h1>Recipe not found</h1>
          <p>This recipe may have been removed.</p>
          <Link className="button-secondary" to="/">Back to recipes</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page form-page">
      <header className="page-header">
        <span className="eyebrow">{existingRecipe ? "MAKE IT YOUR OWN" : "SAVE SOMETHING DELICIOUS"}</span>
        <h1>{existingRecipe ? "Edit recipe" : "Add a recipe"}</h1>
        <p>{existingRecipe ? "Update the details of your recipe." : "Add the details so you can make it again anytime."}</p>
      </header>

      <RecipeForm
        initialValues={existingRecipe ?? {}}
        onSubmit={handleSaveRecipe}
        onCancel={() => navigate(existingRecipe ? `/recipe/${encodeURIComponent(String(existingRecipe.id))}` : -1)}
      />
    </main>
  );
}