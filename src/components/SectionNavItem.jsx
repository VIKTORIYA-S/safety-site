import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function SectionNavItem({ path, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="nav__link nav__link--dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink to={`/${path}`}>{title}</NavLink>

        <ul className={`dropdown ${isOpen ? "dropdown--open" : ""}`}>
            <li><Link to={`/${path}/teachers`}>Педагогам</Link></li>
            <li><Link to={`/${path}/parents`}>Батькам</Link></li>
            <li><Link to={`/${path}/kids`}>Дошкільнятам</Link></li>
        </ul>
    </li>
  );
}

export default SectionNavItem;