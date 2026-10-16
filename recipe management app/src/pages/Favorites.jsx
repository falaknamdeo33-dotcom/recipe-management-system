import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/RecipeContext";

export default function Favorites() {
  const { recipes = [], favorites = [] } = useRecipes();
  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.some((id) => String(id) === String(recipe.id)),
  );

  return (
    <main className="page favorites-page">
      <header className="page-header">
        <span className="eyebrow">SAVED FOR LATER</span>
        <h1>Your favorites</h1>
        <p>All the recipes you’ve saved in one lovely place.</p>
      </header>

      {favoriteRecipes.length > 0 ? (
        <section className="recipe-grid" aria-label="Favorite recipes">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">♡</span>
          <h3>No favorites just yet</h3>
          <p>Tap the heart on any recipe and it’ll be waiting here for you.</p>
          <Link className="button-secondary" to="/">Explore recipes</Link>
        </div>
      )}
    </main>
  );
}