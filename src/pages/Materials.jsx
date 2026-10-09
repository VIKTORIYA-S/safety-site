import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MaterialCard from "../components/MaterialCard";

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