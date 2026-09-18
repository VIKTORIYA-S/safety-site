// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import "./App.css";
// import Normative from "./pages/Normative";
// import Civil from "./pages/Civil";
// import Fire from "./pages/Fire";
// import Mine from "./pages/Mine";
// import Medical from "./pages/Medical";
// import Road from "./pages/Road";
// import Personal from "./pages/Personal";
// import Psychology from "./pages/Psychology";

// function App() {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li><Link to="/normative">Нормативно-правова база</Link></li>
//           <li><Link to="/civil">Цивільний захист</Link></li>
//           <li><Link to="/fire">Пожежна безпека</Link></li>
//           <li><Link to="/mine">Мінна безпека</Link></li>
//           <li><Link to="/road">Безпека дорожнього руху</Link></li>
//           <li><Link to="/personal">Особиста безпека</Link></li>
//           <li><Link to="/medical">Домедична допомога</Link></li>
//           <li><Link to="/psychology">Психологічна безпека та ментальне здоров'я</Link></li>
//         </ul>
//       </nav>

//       <Routes>
//         {/* Главная страница */}
//         <Route path="/" element={<h2>Вітаю! Оберіть розділ у меню</h2>} />

//         {/* Простые страницы */}
//         <Route path="/normative" element={<Normative />} />
//         <Route path="/civil" element={<Civil />} />

//         {/* Страницы с подстраницами */}
//         <Route path="/fire" element={<Fire />}>
//           <Route path="teachers" element={<h3>Матеріали для педагогів</h3>} />
//           <Route path="parents" element={<h3>Матеріали для батьків</h3>} />
//           <Route path="kids" element={<h3>Матеріали для дошкільнят</h3>} />
//         </Route>

//         <Route path="/mine" element={<Mine />}>
//           <Route path="teachers" element={<h3>Матеріали для педагогів</h3>} />
//           <Route path="parents" element={<h3>Матеріали для батьків</h3>} />
//           <Route path="kids" element={<h3>Матеріали для дошкільнят</h3>} />
//         </Route>

//         <Route path="/road" element={<Road />}>
//           <Route path="teachers" element={<h3>Матеріали для педагогів</h3>} />
//           <Route path="parents" element={<h3>Матеріали для батьків</h3>} />
//           <Route path="kids" element={<h3>Матеріали для дошкільнят</h3>} />
//         </Route>

//         <Route path="/personal" element={<Personal />}>
//           <Route path="teachers" element={<h3>Матеріали для педагогів</h3>} />
//           <Route path="parents" element={<h3>Матеріали для батьків</h3>} />
//           <Route path="kids" element={<h3>Матеріали для дошкільнят</h3>} />
//         </Route>

//         <Route path="/medical" element={<Medical />}>
//           <Route path="teachers" element={<h3>Матеріали для педагогів</h3>} />
//           <Route path="parents" element={<h3>Матеріали для батьків</h3>} />
//           <Route path="kids" element={<h3>Матеріали для дошкільнят</h3>} />
//         </Route>

//         <Route path="/psychology" element={<Psychology />}>
//           <Route path="teachers" element={<h3>Матеріали для педагогів</h3>} />
//           <Route path="parents" element={<h3>Матеріали для батьків</h3>} />
//           <Route path="kids" element={<h3>Матеріали для дошкільнят</h3>} />
//         </Route>

//         {/* Редирект для всех неизвестных путей */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// ====================================================================================

// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import "./App.css";
// import Normative from "./pages/Normative";
// import Civil from "./pages/Civil";
// import Section from "./pages/Section";

// // Разделы с подстраницами — описываем один раз
// const sections = [
//   { path: "fire", title: "Пожежна безпека" },
//   { path: "mine", title: "Мінна безпека" },
//   { path: "road", title: "Безпека дорожнього руху" },
//   { path: "personal", title: "Особиста безпека" },
//   { path: "medical", title: "Домедична допомога" },
//   { path: "psychology", title: "Психологічна безпека та ментальне здоров'я" },
// ];

// function App() {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li><Link to="/normative">Нормативно-правова база</Link></li>
//           <li><Link to="/civil">Цивільний захист</Link></li>
//           {sections.map(({ path, title }) => (
//             <li key={path}>
//               <Link to={`/${path}`}>{title}</Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/" element={<h2>Вітаю! Оберіть розділ у меню</h2>} />

//         <Route path="/normative" element={<Normative />} />
//         <Route path="/civil" element={<Civil />} />

//         {sections.map(({ path, title }) => (
//           <Route key={path} path={path} element={<Section title={title} />}>
//             <Route path="teachers" element={<h3>Матеріали для педагогів</h3>} />
//             <Route path="parents" element={<h3>Матеріали для батьків</h3>} />
//             <Route path="kids" element={<h3>Матеріали для дошкільнят</h3>} />
//           </Route>
//         ))}

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;








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
          <Route key={path} path={path} element={<Section title={title} />}>
            <Route path="teachers" element={<Materials section={path} subpage="teachers" />} />
            <Route path="parents" element={<Materials section={path} subpage="parents" />} />
            <Route path="kids" element={<Materials section={path} subpage="kids" />} />
          </Route>
        ))}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
