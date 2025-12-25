
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getChatbotResponse(userInput: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `You are a helpful healthcare assistant for 'Clinic Connect'. 
        You help users find medical clinics, explain specialties, and provide basic health guidance. 
        Always recommend seeing a professional doctor for medical diagnosis. 
        Keep responses concise, friendly, and professional. 
        If asked about specific clinics, refer to general types unless the user asks for a recommendation based on their location.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
}
