const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seed() {
  const ref = await db.collection("materials").add({
    section: "normative",
    fileType: "link",
    linkUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://placehold.co/300x200?text=YouTube",
    text: "Тестове відео на YouTube",
    createdAt: Timestamp.now(),
  });
  console.log("Створено документ (link):", ref.id);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Помилка:", err);
  process.exit(1);
});
