import { useState, useEffect } from "react";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function AdminGate({ children }) {
    const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

    async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Невірна пошта або пароль");
    }
  }

    if (checking) {
    return null;
  }

  if (user) {
    return children;
  }

  return (
    <div className="modal">
      <div className="modal__block">
        <h2 className="modal__title parents__item__title">Вхід <br /> для адміністратора</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="modal__button" type="submit">Увійти</button>
          {error && (
            <p style={{ color: "red", fontSize: "16px", marginTop: "15px", margin: "15px auto" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminGate;