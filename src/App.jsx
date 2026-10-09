// =======================================================================
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import Normative from "./pages/Normative";
import Civil from "./pages/Civil";
import Section from "./pages/Section";
import Materials from "./pages/Materials";
import AdminUpload from "./pages/AdminUpload";
import AdminGate from "./components/AdminGate";
import Footer from "./components/Footer";


const sections = [
  { path: "fire", title: "Пожежна безпека" },
  { path: "mine", title: "Мінна безпека" },
  { path: "road", title: "Безпека дорожнього руху" },
  { path: "personal", title: "Особиста безпека" },
  { path: "medical", title: "Домедична допомога" },
  { path: "psychology", title: "Психологічна безпека та ментальне здоров'я" },
];

function App() {
  return (
    <Router>
      <Nav sections={sections} />

      <Routes>
        <Route path="/" element={<h2>Вітаю! Оберіть розділ у меню</h2>} />
        <Route path="/normative" element={<Normative />} />
        <Route path="/civil" element={<Civil />} />
        <Route path="/admin" element={<AdminGate> <AdminUpload /></AdminGate>}/>

        {sections.map(({ path, title }) => (
          <Route key={path} path={path} element={<Section title={title} sectionKey={path} />}>            <Route path="teachers" element={<Materials section={path} subpage="teachers" />} />
            <Route path="parents" element={<Materials section={path} subpage="parents" />} />
            <Route path="kids" element={<Materials section={path} subpage="kids" />} />
          </Route>
        ))}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;



// //////////////////////////////////////////////////////////////////////
