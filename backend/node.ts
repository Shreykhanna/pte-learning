import fetch from "node-fetch";
import { MongoClient } from "mongodb";

// MongoDB connection string
const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.8";
const client = new MongoClient(uri);

const dbName = "pte_practice";
const collectionName = "filltheblanks";

async function runLLM(prompt) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      prompt: prompt,
      stream: false,
    }),
  });

  const data = await res.json();

  let parsed;
  try {
    parsed = JSON.parse(data.response);
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    throw err;
  }

  return parsed;
}

async function saveToMongo(questionData) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(
      questionData.map((item) => ({
        createdAt: new Date(),
        question: item.question,
        options: item.options,
        answer: item.answer,
      }))
    );

    console.log(`Saved ${result.insertedCount} documents to MongoDB`);
  } catch (err) {
    console.error("MongoDB error:", err);
  } finally {
    await client.close();
  }
}

(async () => {
  const prompt = `
Generate 6 MongoDB documents.  
Requirements:
- The passage must be 120–150 words (at least 6 lines).
- Replace exactly 10 words with blanks, marked as numbers (1), (2), (3), … (10).
- The passage should be academic or general knowledge, like topics about science, history, health, education, or culture.
- Each blank must have 4 options (1 correct + 3 distractors).
- Provide the correct answer for each blank.

Each document must have this exact JSON structure:
{
  "question": "string",
  "options": [["opt1","opt2","opt3","opt4"], ...],
  "answer": "string"
}

Return ONLY a valid JSON array of 6 documents.  
Do not include numbering, extra text, or explanations.  
Output should be ready to use with db.questions.insertMany().
`;

  const response = await runLLM(prompt);
  await saveToMongo(response);
})();
