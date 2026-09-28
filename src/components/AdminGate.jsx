import { useState } from "react";

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
    <div className="modal">
      <div className="modal__block">
        <h2 className="modal__title">Введіть пароль</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <br />
          <button className="modal__button" type="submit">Увійти</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AdminGate;