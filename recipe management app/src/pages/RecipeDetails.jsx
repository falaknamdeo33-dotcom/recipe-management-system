import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotoCredit from "../components/PhotoCredit";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeDetails() {
  const [imageFailed, setImageFailed] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, deleteRecipe } = useRecipes();
  const recipe = recipes.find((item) => String(item.id) === id);

  useEffect(() => {
    setImageFailed(false);
    setCheckedIngredients({});
  }, [id]);

  if (!recipe) {
    return (
      <main className="page">
        <div className="empty-state">
          <span aria-hidden="true">🍽</span>
          <h1>Recipe not found</h1>
          <p>This recipe may have been removed or the link may be incorrect.</p>
          <Link className="button-secondary" to="/">Back to recipes</Link>
        </div>
      </main>
    );
  }

  function handleDelete() {
    if (window.confirm(`Delete "${recipe.title}"? This cannot be undone.`)) {
      deleteRecipe(recipe.id);
      navigate("/");
    }
  }

  return (
    <main className="page details-page">
      <Link className="back-link" to="/">← All recipes</Link>
      <article className="recipe-detail">
        {recipe.image && !imageFailed ? (
          <img
            className="recipe-details-image"
            src={recipe.image}
            alt={recipe.imageAlt || recipe.title}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className={`recipe-details-placeholder ${recipe.illustration ? "is-illustrated" : ""}`} aria-hidden="true">
            <span className="recipe-illustration">{recipe.illustration || "🍲"}</span>
          </div>
        )}
        <PhotoCredit recipe={recipe} />

        <div className="recipe-detail-body">
          <span className="eyebrow">
            {recipe.cuisine ? `${recipe.cuisine} · ` : ""}
            {recipe.category || "RECIPE"}
          </span>
          <h1>{recipe.title}</h1>
          {recipe.description && <p className="recipe-description">{recipe.description}</p>}
          <div className="detail-meta">
            {recipe.time != null && <span><strong>{recipe.time} min</strong> prep &amp; cook</span>}
            {recipe.servings != null && <span><strong>{recipe.servings}</strong> servings</span>}
            {recipe.difficulty && <span><strong>{recipe.difficulty}</strong> difficulty</span>}
            {recipe.restTime && <span><strong>{recipe.restTime}</strong></span>}
          </div>

          <div className="detail-actions">
            <Link className="button-primary" to={`/recipe/${encodeURIComponent(String(recipe.id))}/edit`}>
              Edit recipe
            </Link>
            <button className="button-secondary danger-button" type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>

          {recipe.ingredients?.length > 0 && (
            <section className="recipe-section">
              <div className="recipe-section-heading">
                <div>
                  <h2>Ingredients</h2>
                  <p>Tap an ingredient as you get it ready.</p>
                </div>
                <span className="ingredient-progress">
                  {Object.values(checkedIngredients).filter(Boolean).length}/{recipe.ingredients.length} ready
                </span>
              </div>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    className={checkedIngredients[index] ? "is-checked" : ""}
                    key={`${ingredient}-${index}`}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(checkedIngredients[index])}
                        onChange={(event) =>
                          setCheckedIngredients((current) => ({
                            ...current,
                            [index]: event.target.checked,
                          }))
                        }
                      />
                      <span>{ingredient}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {recipe.instructions?.length > 0 && (
            <section className="recipe-section">
              <h2>Let’s make it</h2>
              <ol className="instruction-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={`${instruction}-${index}`}>
                    <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
