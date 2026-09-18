// seed-materials.js
// Скрипт создаёт 2 тестовых документа в коллекции `materials`
// с корректным Timestamp в поле createdAt.

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

// Путь к вашему service account key (JSON), скачанному из:
// Firebase Console → Project settings → Service accounts → Generate new private key
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seed() {
  const now = Timestamp.now();

  const doc1 = {
    section: "fire",
    subpage: "parents",
    fileType: "image",
    createdAt: now,
  };

  const doc2 = {
    section: "normative",
    fileType: "image",
    createdAt: now,
  };

  const ref1 = await db.collection("materials").add(doc1);
  console.log("Создан документ 1:", ref1.id, doc1);

  const ref2 = await db.collection("materials").add(doc2);
  console.log("Создан документ 2:", ref2.id, doc2);

  console.log("Готово!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Ошибка при создании документов:", err);
  process.exit(1);
});
