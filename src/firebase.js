// Импортируем функцию инициализации самого Firebase
import { initializeApp } from "firebase/app";

// Импортируем функции для каждого сервиса, который будем использовать
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Ваша конфигурация проекта (скопирована из консоли Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDev8ZA5Bt1_9-KrN0Nt6TBZJ-Av28rdYA",
  authDomain: "safety-site-63ffc.firebaseapp.com",
  projectId: "safety-site-63ffc",
  storageBucket: "safety-site-63ffc.firebasestorage.app",
  messagingSenderId: "720100086275",
  appId: "1:720100086275:web:7174f897cc9b528194f436"
};

// Инициализируем сам Firebase-проект
const app = initializeApp(firebaseConfig);

// Создаём и экспортируем "точки входа" к каждому сервису,
// чтобы использовать их в других компонентах
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);