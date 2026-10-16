import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="navbar-brand" to="/" aria-label="Recipe home">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span>Gather &amp; Graze</span>
      </NavLink>

      <nav className="navbar-links" aria-label="Main navigation">
        <NavLink to="/" end>
          Discover
        </NavLink>
        <NavLink to="/favorites">
          Favorites
        </NavLink>
        <NavLink className="nav-add-button" to="/recipe/new">
          <span aria-hidden="true">＋</span> Add recipe
        </NavLink>
      </nav>
    </header>
  );
}