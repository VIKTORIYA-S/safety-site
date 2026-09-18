import { useState } from "react";

// Простой пароль для доступа к админ-панели.
// Секретность не критична — это просто барьер от случайных посетителей.
const ADMIN_PASSWORD = "dnz160";

function AdminGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    sessionStorage.getItem("admin_unlocked") === "true"
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_unlocked", "true");
      setUnlocked(true);
    } else {
      setError("Невірний пароль");
    }
  }

  if (unlocked) {
    return children;
  }

  return (
    <div className="admin-gate">
      <form onSubmit={handleSubmit}>
        <h2>Введіть пароль</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit">Увійти</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default AdminGate;