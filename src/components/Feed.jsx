import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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

function Feed({ section, subpage }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);

      const constraints = [where("section", "==", section)];
      if (subpage) {
        constraints.push(where("subpage", "==", subpage));
      }
      constraints.push(orderBy("createdAt", "desc"));

      const q = query(collection(db, "materials"), ...constraints);

      const snapshot = await getDocs(q);
      console.log("Отримано документів:", snapshot.docs.length);
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchItems();
  }, [section, subpage]);

  if (loading) return <p>Завантаження...</p>;
  if (items.length === 0) return <p>Матеріалів поки немає.</p>;

    return (
    <div className="feed">
      {items.map((item) => {
        if (item.fileType === "link") {
          return (
            <a
  key={item.id}
  className="feed-item"
  href={item.linkUrl}
  target="_blank"
  rel="noreferrer"
>
  <svg
    className="feed-item__clip"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
  <p>{item.text}</p>
</a>
          );
        }

        return (
          <div key={item.id} className="feed-item">
            {item.fileType === "image" && <img src={item.fileUrl} alt={item.text} />}
            {item.fileType === "pdf" && (
              <a href={item.fileUrl} target="_blank" rel="noreferrer">📄 Завантажити документ</a>
            )}
            {item.fileType === "video" && (
              <a
                className="video-card"
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img src={getVideoThumbnail(item.fileUrl)} alt={item.text} />
                <span className="play-icon">▶️</span>
              </a>
            )}
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;