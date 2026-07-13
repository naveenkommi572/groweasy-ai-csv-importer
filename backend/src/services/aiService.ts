import { crmPrompt } from "../prompts/crmPrompt";

export async function mapCRM(records: any[]) {
  const MODEL = "models/gemini-2.0-flash-001";
console.log("Using model:", MODEL);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${crmPrompt}

Records:
${JSON.stringify(records)}`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Gemini API Error:", error);
    throw new Error(error);
  }

  const data = await response.json();

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini returned invalid JSON:", cleaned);
    throw new Error("Gemini returned invalid JSON.");
  }
}