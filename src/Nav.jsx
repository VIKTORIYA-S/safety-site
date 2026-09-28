// src/Nav.jsx
import { NavLink, Link } from "react-router-dom";
import logoImg from "./assets/images/logo.png";
import SectionNavItem from "./components/SectionNavItem";


function Nav({ sections }) {
  return (
    <header className="header">
      <Link className="logo" to="/">
        <img className="logo__img" src={logoImg} alt="logo" />
      </Link>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__link">
            <NavLink to="/normative">Нормативно-правова база</NavLink>
          </li>
          <li className="nav__link">
            <NavLink to="/civil">Цивільний захист</NavLink>
          </li>
          {sections.map(({ path, title }) => (
            // <li className="nav__link" key={path}>
            //   <NavLink to={`/${path}`}>{title}</NavLink>
            // </li>
            <SectionNavItem key={path} path={path} title={title} />
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;

