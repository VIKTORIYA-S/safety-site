const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function update() {
  // Документ 1: section=fire, subpage=parents
  const snap1 = await db
    .collection("materials")
    .where("section", "==", "fire")
    .where("subpage", "==", "parents")
    .get();

  for (const doc of snap1.docs) {
    await doc.ref.update({
      fileUrl: "https://placehold.co/600x400?text=Fire+Safety",
      text: "Тестовий матеріал: Пожежна безпека (батьки)",
    });
    console.log("Оновлено (fire/parents):", doc.id);
  }

  // Документ 2: section=normative
  const snap2 = await db
    .collection("materials")
    .where("section", "==", "normative")
    .get();

  for (const doc of snap2.docs) {
    await doc.ref.update({
      fileUrl: "https://placehold.co/600x400?text=Normative",
      text: "Тестовий матеріал: Нормативно-правова база",
    });
    console.log("Оновлено (normative):", doc.id);
  }

  console.log("Готово!");
  process.exit(0);
}

update().catch((err) => {
  console.error("Помилка при оновленні документів:", err);
  process.exit(1);
});
