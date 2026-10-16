import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MaterialCard from "../components/MaterialCard";

function Materials({ section, subpage }) {
  const { folder } = useParams();
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
      let list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (folder) {
        list = list.filter((item) => item.folder === folder);
      }
      setItems(list);
      setLoading(false);
    }
    fetchItems();
  }, [section, subpage, folder]);

  if (loading) return <p>Завантаження...</p>;
  if (items.length === 0) return <p>Матеріалів поки немає.</p>;

  return (
    <div className="materials-grid">
      {items.map((item) => (
        <MaterialCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Materials;