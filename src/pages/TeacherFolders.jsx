import { Link } from "react-router-dom";
import { TEACHER_FOLDERS } from "../data/teacherFolders";
import folderImg from "../assets/images/folder-blue.png";

function TeacherFolders({ section }) {
  return (
    <div className="folders-grid">
      {TEACHER_FOLDERS.map((f) => (
        <Link
          key={f.value}
          className="folder-card"
          to={`/${section}/teachers/${f.value}`}
        >
        <img className="folder-card__img" src={folderImg} alt="" />
        <span className="folder-card__title">{f.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default TeacherFolders;