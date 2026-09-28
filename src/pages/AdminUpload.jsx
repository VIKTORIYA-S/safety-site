import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Замените на свои значения из Cloudinary (Dashboard → Settings → Upload)
const CLOUD_NAME = "prwnb7wo";
const UPLOAD_PRESET = "safety-site-uploads";

// Разделы сайта. hasSubpages: true — есть подстраницы (Педагоги/Батьки/Дошкільнята)
const SECTIONS = [
  { value: "normative", label: "Нормативно-правова база", hasSubpages: false },
  { value: "civil", label: "Цивільний захист", hasSubpages: false },
  { value: "fire", label: "Пожежна безпека", hasSubpages: true },
  { value: "mine", label: "Мінна безпека", hasSubpages: true },
  { value: "road", label: "Безпека дорожнього руху", hasSubpages: true },
  { value: "personal", label: "Особиста безпека", hasSubpages: true },
  { value: "medical", label: "Домедична допомога", hasSubpages: true },
  { value: "psychology", label: "Психологічна безпека та ментальне здоров'я", hasSubpages: true },
];

const SUBPAGES = [
  { value: "teachers", label: "Педагоги" },
  { value: "parents", label: "Батьки" },
  { value: "kids", label: "Дошкільнята" },
];

const FILE_TYPES = [
  { value: "image", label: "Картинка", needsFile: true },
  { value: "pdf", label: "PDF-документ", needsFile: true },
  { value: "video", label: "Відео (файл)", needsFile: true },
  { value: "link", label: "Посилання (YouTube / зовнішній сайт)", needsFile: false },
];

const TYPE_ICONS = {
  image: "🖼️",
  pdf: "📄",
  video: "▶️",
  link: "🔗",
};

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error("Помилка завантаження файлу в Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
}

function AdminUpload() {
  const [section, setSection] = useState(SECTIONS[0].value);
  const [subpage, setSubpage] = useState(SUBPAGES[0].value);
  const [fileType, setFileType] = useState(FILE_TYPES[0].value);
  const [file, setFile] = useState(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [materials, setMaterials] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const sectionInfo = SECTIONS.find((s) => s.value === section);
  const typeInfo = FILE_TYPES.find((t) => t.value === fileType);

  async function fetchMaterials() {
    setLoadingList(true);
    const constraints = [where("section", "==", section)];
    if (sectionInfo.hasSubpages) {
      constraints.push(where("subpage", "==", subpage));
    }
    constraints.push(orderBy("createdAt", "desc"));

    const q = query(collection(db, "materials"), ...constraints);
    const snapshot = await getDocs(q);
    setMaterials(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoadingList(false);
  }

  useEffect(() => {
    fetchMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, subpage]);

  async function handleDelete(id) {
    if (!window.confirm("Видалити цей матеріал? Дію не можна скасувати.")) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "materials", id));
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Помилка видалення: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setUploading(true);

    try {
      const docData = {
        section,
        fileType,
        text,
        createdAt: serverTimestamp(),
      };

      if (sectionInfo.hasSubpages) {
        docData.subpage = subpage;
      }

      if (typeInfo.needsFile) {
        if (!file) throw new Error("Оберіть файл для завантаження");
        docData.fileUrl = await uploadToCloudinary(file);
      } else {
        if (!linkUrl) throw new Error("Вкажіть посилання");
        docData.linkUrl = linkUrl;
        if (thumbnailUrl) docData.thumbnailUrl = thumbnailUrl;
      }

      await addDoc(collection(db, "materials"), docData);

      setMessage("✅ Матеріал успішно завантажено!");
      setFile(null);
      setLinkUrl("");
      setThumbnailUrl("");
      setText("");
      e.target.reset();

      fetchMaterials();
    } catch (err) {
      console.error(err);
      setMessage("❌ Помилка: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-upload">
      <h2>Додати матеріал</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Розділ:
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            {SECTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>

        {sectionInfo.hasSubpages && (
          <label>
            Підсторінка:
            <select value={subpage} onChange={(e) => setSubpage(e.target.value)}>
              {SUBPAGES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        )}

        <label>
          Тип матеріалу:
          <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
            {FILE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>

        {typeInfo.needsFile ? (
          <label>
            Файл:
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        ) : (
          <>
            <label>
              Посилання:
              <input
                type="url"
                placeholder="https://www.youtube.com/..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </label>
            <label>
              Картинка-превʼю (необовʼязково):
              <input
                type="url"
                placeholder="https://..."
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
            </label>
          </>
        )}

        <label>
          Текст / підпис:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        <button type="submit" disabled={uploading}>
          {uploading ? "Завантаження..." : "Завантажити"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <h3>
        Матеріали розділу «{sectionInfo.label}
        {sectionInfo.hasSubpages
          ? ` → ${SUBPAGES.find((s) => s.value === subpage)?.label}`
          : ""}
        »
      </h3>

      {loadingList ? (
        <p>Завантаження списку...</p>
      ) : materials.length === 0 ? (
        <p>Матеріалів поки немає.</p>
      ) : (
        <ul className="admin-materials-list">
          {materials.map((m) => (
            <li key={m.id} className="admin-materials-item">
              <span>{TYPE_ICONS[m.fileType] || "📁"}</span>
              <span>{m.text || "(без підпису)"}</span>
              <button
                onClick={() => handleDelete(m.id)}
                disabled={deletingId === m.id}
              >
                {deletingId === m.id ? "Видалення..." : "Видалити"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminUpload;