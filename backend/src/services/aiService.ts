import { crmPrompt } from "../prompts/crmPrompt";

export async function mapCRM(records: any[]) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
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
${JSON.stringify(records)}`
              }
            ]
          }
        ]
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}