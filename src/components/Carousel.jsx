import { useState } from "react";

// Cloudinary автоматически генерирует превью-кадр видео,
// если заменить расширение файла в URL на .jpg
function getVideoThumbnail(url) {
  return url.replace(/\.[^/.]+$/, ".jpg");
}

// Достаём ID видео из любой распространённой формы YouTube-ссылки
function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Картинка для карточки-посилання: сначала своя (thumbnailUrl),
// иначе, если это YouTube — автопревью с самого YouTube
function getLinkThumbnail(item) {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  const ytId = extractYouTubeId(item.linkUrl);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null;
}

function Carousel({ items, title }) {
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  const current = items[index];

  return (
    <div className="carousel">
      {title && <h4>{title}</h4>}
      <div className="carousel-inner">
        <button onClick={prev}>‹</button>
        <div className="carousel-content">
          {current.fileType === "image" && <img src={current.fileUrl} alt={current.text} />}
          {current.fileType === "pdf" && (
            <a href={current.fileUrl} target="_blank" rel="noreferrer">📄 {current.text}</a>
          )}
          {current.fileType === "video" && (
            <a
              className="video-card"
              href={current.fileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <img src={getVideoThumbnail(current.fileUrl)} alt={current.text} />
              <span className="play-icon">▶️</span>
            </a>
          )}
          {current.fileType === "link" && (
            <a
              className="link-card"
              href={current.linkUrl}
              target="_blank"
              rel="noreferrer"
            >
              {getLinkThumbnail(current) && (
                <img src={getLinkThumbnail(current)} alt={current.text} />
              )}
              {extractYouTubeId(current.linkUrl) ? (
                <span className="play-icon">▶️</span>
              ) : (
                <span className="play-icon">🔗</span>
              )}
            </a>
          )}
        </div>
        <button onClick={next}>›</button>
      </div>
      <p className="carousel-caption">{current.text}</p>
    </div>
  );
}

export default Carousel;