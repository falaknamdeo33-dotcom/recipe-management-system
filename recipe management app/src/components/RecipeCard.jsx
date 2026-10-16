import { useState } from "react";
import { Link } from "react-router-dom";
import PhotoCredit from "./PhotoCredit";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeCard({ recipe }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { favorites, toggleFavorite } = useRecipes();
  const isFavorite = favorites.some(
    (favoriteId) => String(favoriteId) === String(recipe.id),
  );

  return (
    <article className="recipe-card">
      <Link
        className="card-image-wrap"
        to={`/recipe/${encodeURIComponent(String(recipe.id))}`}
        aria-label={`View ${recipe.title}`}
      >
        {recipe.image && !imageFailed ? (
          <img
            src={recipe.image}
            alt={recipe.imageAlt || recipe.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={`recipe-image-placeholder ${recipe.illustration ? "is-illustrated" : ""}`} aria-hidden="true">
            <span className="recipe-illustration">{recipe.illustration || "🍲"}</span>
          </span>
        )}
        <span className="category-pill">
          {recipe.cuisine ? `${recipe.cuisine} · ` : ""}
          {recipe.category || "Recipe"}
        </span>
      </Link>
      <PhotoCredit recipe={recipe} />
      <button
        className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
        type="button"
        onClick={() => toggleFavorite(recipe.id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      <div className="card-content">
        <div className="recipe-meta">
          {recipe.time != null && <span>◷ {recipe.time} min</span>}
          {recipe.time != null && recipe.servings != null && (
            <span aria-hidden="true">·</span>
          )}
          {recipe.servings != null && <span>{recipe.servings} servings</span>}
          {recipe.difficulty && (
            <span className="difficulty-badge">{recipe.difficulty}</span>
          )}
        </div>
        {recipe.restTime && (
          <span className="rest-time-note">{recipe.restTime}</span>
        )}
        <h2>
          <Link to={`/recipe/${encodeURIComponent(String(recipe.id))}`}>
            {recipe.title}
          </Link>
        </h2>
        <p>{recipe.description}</p>
        <div className="card-bottom">
          <Link
            className="text-link"
            to={`/recipe/${encodeURIComponent(String(recipe.id))}`}
          >
            View recipe <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
