// src/Nav.jsx
import { NavLink } from "react-router-dom";

function Nav({ sections }) {
    console.log(sections);
  return (
    <nav>
      <ul>
        <li><NavLink to="/normative">Нормативно-правова база</NavLink></li>
        <li><NavLink to="/civil">Цивільний захист</NavLink></li>
        {sections.map(({ path, title }) => (
          <li key={path}>
            <NavLink to={`/${path}`}>{title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;