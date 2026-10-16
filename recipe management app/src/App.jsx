import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddRecipe from "./pages/AddRecipe";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import { RecipeProvider } from "./context/RecipeContext";

function NotFound() {
  return (
    <main className="page not-found">
      <h1>Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <a className="button-link" href="/">Back to recipes</a>
    </main>
  );
}

export default function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipe/new" element={<AddRecipe />} />
            <Route path="/recipe/:id/edit" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer className="site-footer">
            <span>Made with care for the love of good food.</span>
          </footer>
        </div>
      </BrowserRouter>
    </RecipeProvider>
  );
}
