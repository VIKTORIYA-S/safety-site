// src/utils/materialHelpers.js

// Cloudinary сам делает кадр-превью видео, если заменить расширение на .jpg
export function getVideoThumbnail(url) {
  return url.replace(/\.[^/.]+$/, ".jpg");
}

// Достаём ID видео из любой формы ссылки YouTube
export function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Картинка для ссылки: своя (thumbnailUrl) или превью с YouTube
export function getLinkThumbnail(item) {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  const ytId = extractYouTubeId(item.linkUrl);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null;
}