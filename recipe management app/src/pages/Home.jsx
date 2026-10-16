import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/RecipeContext";

export default function Home() {
  const { recipes = [] } = useRecipes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const categories = useMemo(
    () => [
      "All",
      ...new Set([
        ...recipes.map((recipe) => recipe.category),
        ...recipes.map((recipe) => recipe.cuisine),
      ].filter(Boolean)),
    ],
    [recipes],
  );
  const matchingRecipes = recipes.filter((recipe) => {
    const searchText = [
      recipe.title,
      recipe.description,
      recipe.category,
      recipe.cuisine,
      ...(Array.isArray(recipe.ingredients) ? recipe.ingredients : []),
    ]
      .join(" ")
      .toLowerCase();
    return (
      searchText.includes(search.trim().toLowerCase()) &&
      (category === "All" ||
        recipe.category === category ||
        recipe.cuisine === category)
    );
  });
  const visibleRecipes = [...matchingRecipes].sort((first, second) => {
    if (sort === "quickest") {
      return (first.time ?? Infinity) - (second.time ?? Infinity);
    }
    if (sort === "alphabetical") {
      return first.title.localeCompare(second.title);
    }
    return 0;
  });

  return (
    <main className="page home-page">
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="eyebrow">A RECIPE BOX FOR REAL LIFE</span>
          <h1>Made at home.<br />Made to be shared.</h1>
          <p>From weeknight favorites to the dishes that taste like home, keep every good thing close at hand.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#recipe-collection">Find your next favorite <span aria-hidden="true">↓</span></a>
            <Link className="hero-add-link" to="/recipe/new">＋ Share a recipe</Link>
          </div>
          <div className="hero-note">
            <span className="hero-note-mark" aria-hidden="true">✳</span>
            <span><strong>{recipes.length} recipes</strong><br />and growing in your kitchen</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="hero-art-orbit hero-art-orbit-one" />
          <span className="hero-art-orbit hero-art-orbit-two" />
          <span className="hero-art-plate">🍛</span>
          <span className="hero-art-leaf hero-art-leaf-one">✿</span>
          <span className="hero-art-leaf hero-art-leaf-two">✳</span>
        </div>
      </section>

      <section className="collection-section" id="recipe-collection">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PICKED FROM YOUR RECIPE BOX</span>
            <h2>What sounds good?</h2>
          </div>
          <span className="recipe-count"><span className="count-flower" aria-hidden="true">✳</span> {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} to explore</span>
        </div>

        <div className="recipe-toolbar">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search dishes or ingredients"
              aria-label="Search recipes"
            />
          </label>
          <div className="category-filters" aria-label="Filter recipes by category">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter-chip ${category === item ? "is-selected" : ""}`}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="sort-field">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort recipes"
            >
              <option value="featured">Featured</option>
              <option value="quickest">Quickest</option>
              <option value="alphabetical">A–Z</option>
            </select>
          </label>
        </div>

        <div className="results-summary" aria-live="polite">
          <span>
            Showing <strong>{visibleRecipes.length}</strong> of {recipes.length} recipes
            {category !== "All" ? ` · ${category}` : ""}
          </span>
          {(search || category !== "All" || sort !== "featured") && (
            <button
              className="clear-filters"
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("featured");
              }}
            >
              Clear filters
            </button>
          )}
        </div>

      {visibleRecipes.length > 0 ? (
        <section className="recipe-grid" aria-label="Recipes">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">🍋</span>
          <h3>{recipes.length ? "No recipes match that search" : "Your recipe box is ready"}</h3>
          <p>{recipes.length ? "Try another name or category." : "Add a favorite dish to start building your collection."}</p>
        </div>
      )}
      </section>
    </main>
  );
}