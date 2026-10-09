// Section.jsx
import { useOutlet } from "react-router-dom";
import ChoiceCard from "../components/ChoiceCard";
import sectionCards from "../data/sectionCards";

function Section({ title, sectionKey }) {
  const outlet = useOutlet();
  const cards = sectionCards[sectionKey] || [];

  return (
  <div className="parents">
    <h2 className="parents__title">{title}</h2>

      {outlet ? (
        outlet
      ) : (
        <div className="parents__wrapper">
          <ul className="parents__list">
            {cards.map((card) => (
              <ChoiceCard key={card.to} {...card} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Section;