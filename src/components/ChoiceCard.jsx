// src/components/ChoiceCard.jsx
import { Link } from "react-router-dom";

function ChoiceCard({ image, title, text, to }) {
  return (
    <li className="parents__item">
      <h3 className="parents__item__title">{title}</h3>
      <p className="parents__item__text">{text}</p>
      <div
        className="parents__item__block"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      ></div>
      <Link className="parents__item__button interactive_games" to={to}>
        Дивитись матеріали
      </Link>
    </li>
  );
}

export default ChoiceCard;