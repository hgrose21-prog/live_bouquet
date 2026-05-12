import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function identifyPlant(imageBase64: string) {
  const ai = getAI();
  if (!ai) throw new Error("AI service not configured. Please set GEMINI_API_KEY.");

  const model = "gemini-3-flash-preview";
  const prompt = `Identify this plant and provide its common name, scientific name, and basic care requirements (watering frequency, light needs, humidity). 
  Also analyze its current health from the image. 
  Respond in JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          commonName: { type: Type.STRING },
          scientificName: { type: Type.STRING },
          wateringInfo: { type: Type.STRING },
          lightNeeds: { type: Type.STRING },
          humidity: { type: Type.STRING },
          healthAnalysis: { type: Type.STRING },
          careTips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["commonName", "scientificName", "healthAnalysis"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function getPlantAdvice(plantName: string, weather: string) {
  const ai = getAI();
  if (!ai) return { advice: ["AI 서비스를 이용하려면 API 키 설정이 필요합니다."] };

  const model = "gemini-3-flash-preview";
  const prompt = `Based on the plant "${plantName}" and the current weather "${weather}", provide 3-4 specific care tips for today. Respond in JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          advice: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  return JSON.parse(response.text || '{"advice": []}');
}
