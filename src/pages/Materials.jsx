import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Carousel from "../components/Carousel";

function Materials({ section, subpage }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const q = query(
        collection(db, "materials"),
        where("section", "==", section),
        where("subpage", "==", subpage)
      );
      const snapshot = await getDocs(q);
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchItems();
  }, [section, subpage]);

  if (loading) return <p>Завантаження...</p>;

  // Группируем материалы по типу файла — отдельная карусель на каждый тип
  const grouped = items.reduce((acc, item) => {
    acc[item.fileType] = acc[item.fileType] || [];
    acc[item.fileType].push(item);
    return acc;
  }, {});

  const typeLabels = {
    image: "Інтерактивні ігри",
    pdf: "Література",
    video: "Відео",
    link: "Корисні посилання",
  };

  const types = Object.keys(grouped);

  if (types.length === 0) return <p>Матеріалів поки немає.</p>;

  return (
    <div>
      {types.map((type) => (
        <Carousel key={type} items={grouped[type]} title={typeLabels[type] || type} />
      ))}
    </div>
  );
}

export default Materials;