// src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Link className="footer__admin" to="/admin">
        Для адміністратора
      </Link>
    </footer>
  );
}

export default Footer;