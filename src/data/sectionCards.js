// src/data/sectionCards.js
import fireTeachers from "../assets/images/fire-teachers.png";
import fireParents from "../assets/images/fire-parents.png";
import fireKids from "../assets/images/fire-kids.png";

import mineTeachers from "../assets/images/mine-teachers.png";
import mineParents from "../assets/images/mine-parents.png";
import mineKids from "../assets/images/mine-kids.png";

import roadTeachers from "../assets/images/road-teachers.png";
import roadParents from "../assets/images/road-parents.png";
import roadKids from "../assets/images/road-kids.png";

import personalTeachers from "../assets/images/personal-teachers.png";
import personalParents from "../assets/images/personal-parents.png";
import personalKids from "../assets/images/personal-kids.png";

import medicalTeachers from "../assets/images/medical-teachers.png";
import medicalParents from "../assets/images/medical-parents.png";
import medicalKids from "../assets/images/medical-kids.png";

import psychologyTeachers from "../assets/images/psychology-teachers.png";
import psychologyParents from "../assets/images/psychology-parents.png";
import psychologyKids from "../assets/images/psychology-kids.png";

// ...так же для остальных разделов

const sectionCards = {
  fire: [
    { image: fireTeachers, title: "Педагогам", text: "Методичні рекомендації, сценарії занять і презентації для навчання дітей правилам поведінки під час пожежі", to: "teachers" },
    { image: fireParents, title: "Батькам", text: "Поради, як навчити дитину діяти без паніки, перевірити безпечність дому, розповісти про номер «101»", to: "parents" },
    { image: fireKids, title: "Дошкільнятам", text: "Казкові історії, ігри та малюнки про пожежників, вогонь і правила безпеки", to: "kids" },
  ],
   mine: [
    { image: mineTeachers, title: "Педагогам", text: "Навчальні презентації, відео та методички про небезпеку вибухових предметів", to: "teachers" },
    { image: mineParents, title: "Батькам", text: "Пам’ятки про те, як пояснити дітям небезпеку невідомих предметів", to: "parents" },
    { image: mineKids, title: "Дошкільнятам", text: "Ілюстровані історії про те, що робити, якщо знайдено щось підозріле", to: "kids" },
  ],
  road: [
    { image: roadTeachers, title: "Педагогам", text: "Конспекти занять, інтерактивні вправи, плакати про правила дорожнього руху", to: "teachers" },
    { image: roadParents, title: "Батькам", text: "Поради, як навчати дітей переходити дорогу, користуватися ременями безпеки", to: "parents" },
    { image: roadKids, title: "Дошкільнятам", text: "Веселі ігри зі світлофором, пісеньки про дорогу, розмальовки", to: "kids" },
  ],
  personal: [
    { image: personalTeachers, title: "Педагогам", text: "Матеріали для занять про поведінку з незнайомцями, правила у школі та на вулиці", to: "teachers" },
    { image: personalParents, title: "Батькам", text: "Рекомендації, як навчити дитину бути уважною й обережною", to: "parents" },
    { image: personalKids, title: "Дошкільнятам", text: "Казкові персонажі, що навчають дітей берегти себе", to: "kids" },
  ],
  medical: [
    { image: medicalTeachers, title: "Педагогам", text: "Методичні матеріали про першу допомогу, навчальні відео", to: "teachers" },
    { image: medicalParents, title: "Батькам", text: "Поради, як діяти при травмах, опіках, укусах", to: "parents" },
    { image: medicalKids, title: "Дошкільнятам", text: "Казкові історії про аптечку‑помічницю, що лікує подряпини", to: "kids" },
  ],
  psychology: [
    { image: psychologyTeachers, title: "Педагогам", text: "Матеріали для занять про емоції, стрес і підтримку дітей", to: "teachers" },
    { image: psychologyParents, title: "Батькам", text: "Поради, як допомогти дитині справлятися з тривогою, створити спокійну атмосферу вдома", to: "parents" },
    { image: psychologyKids, title: "Дошкільнятам", text: "Казкові історії про сердечко, сонечко й хмаринку, що навчають розуміти свої почуття", to: "kids" },
  ]
};

export default sectionCards;