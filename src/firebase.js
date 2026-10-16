// Импортируем функцию инициализации самого Firebase
import { initializeApp } from "firebase/app";

// Импортируем функции для каждого сервиса, который будем использовать
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Ваша конфигурация проекта (скопирована из консоли Firebase)
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQxD1FmCQIP2hdvO2jrwABytlgr43X0Uc",
  authDomain: "safety-site-2.firebaseapp.com",
  projectId: "safety-site-2",
  storageBucket: "safety-site-2.firebasestorage.app",
  messagingSenderId: "183529339440",
  appId: "1:183529339440:web:097f599c79cdcf07068bf5"
};

// Инициализируем сам Firebase-проект
const app = initializeApp(firebaseConfig);

// Создаём и экспортируем "точки входа" к каждому сервису,
// чтобы использовать их в других компонентах
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);







