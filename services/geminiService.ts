
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAdvice = async (userPrompt: string, products: Product[]) => {
  const productContext = products.map(p => 
    `${p.name} ($${p.price}) in ${p.category}: ${p.description}`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are a helpful and sophisticated personal shopper for 'Lumina Boutique'.
        Use the following product list to help the user. Keep your answers concise, elegant, and helpful.
        Recommend specific products if they match the user's needs.
        
        PRODUCTS AVAILABLE:
        ${productContext}`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI assistant is currently resting. Please browse our collection!";
  }
};
