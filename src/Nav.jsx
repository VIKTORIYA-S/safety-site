// src/Nav.jsx
import { useState, useEffect  } from "react";
import { NavLink, Link } from "react-router-dom";
import logoImg from "./assets/images/logo.png";
import SectionNavItem from "./components/SectionNavItem";

function Nav({ sections }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  return () => {
    document.documentElement.style.overflow = "";
  };
}, [menuOpen]);

  return (
    <header className="header">
      <Link className="logo" to="/">
        <img className="logo__img" src={logoImg} alt="logo" />
      </Link>

      <button
        className="burger"
        type="button"
        aria-label="Меню"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

            {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      <nav
        className={menuOpen ? "nav nav--open" : "nav"}
        onClick={(e) => {
          if (e.target.closest("a")) setMenuOpen(false);
        }}
      >
        <ul className="nav__list">
          <li className="nav__link">
            <NavLink to="/normative">Нормативно-правова база</NavLink>
          </li>
          <li className="nav__link">
            <NavLink to="/civil">Цивільний захист</NavLink>
          </li>
          {sections.map(({ path, title }) => (
            <SectionNavItem key={path} path={path} title={title} />
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;