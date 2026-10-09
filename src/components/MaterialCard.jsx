// src/components/MaterialCard.jsx
import { getVideoThumbnail, getLinkThumbnail } from "../utils/materialHelpers";
import defaultImg from "../assets/images/document.png";

// Куда ведёт карточка: ссылки открывают linkUrl, остальное fileUrl
function getHref(item) {
  return item.fileType === "link" ? item.linkUrl : item.fileUrl;
}

// Какая картинка стоит на карточке
function getImage(item) {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  if (item.fileType === "image") return item.fileUrl;
  if (item.fileType === "video") return getVideoThumbnail(item.fileUrl);
  if (item.fileType === "link") return getLinkThumbnail(item) || defaultImg;
  return defaultImg; // PDF и всё остальное
}

function MaterialCard({ item }) {
  return (
    <a
      className="material-card"
      href={getHref(item)}
      target="_blank"
      rel="noreferrer"
    >
      <img className="material-card__img" src={getImage(item)} alt="" />
      <span className="material-card__title">{item.text}</span>
    </a>
  );
}

export default MaterialCard;