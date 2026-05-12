import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function identifyPlant(imageBase64: string) {
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
