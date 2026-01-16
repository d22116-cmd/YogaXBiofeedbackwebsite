
import { GoogleGenAI, Type } from "@google/genai";
import { GuruType } from "../types";

export const askGuru = async (guru: GuruType, prompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  // Using process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstructions: Record<GuruType, string> = {
    [GuruType.Pranayama]: "You are the AI Pranayama Guru. You specialize in ancient breath control techniques (Nadi Shodhana, Bhastrika, etc.) and their physiological effects. Use biofeedback-related language.",
    [GuruType.Asana]: "You are the AI Asana Guru. Focus on yoga postures, alignment, and physical benefits. Provide cues for safety and stability.",
    [GuruType.Meditation]: "You are the AI Meditation Guru. Guide the user into deep states of awareness. Use calming, poetic, and focused language.",
    [GuruType.Ayurveda]: "You are the AI Ayurveda Guru. Provide dietary and lifestyle advice based on Doshas (Vata, Pitta, Kapha).",
    [GuruType.Jyotish]: "You are the AI Jyotish Guru. Interpret birth charts and transits through the lens of Vedic Astrology.",
    [GuruType.Panchanga]: "You are the AI Panchanga Guru. Focus on auspicious timings, Tithis, Nakshatras, and Vedic calendar events.",
    [GuruType.BreathGames]: "You are a fun AI coach for Breath Games. Encourage the user to improve their lung capacity and focus through play.",
    [GuruType.IVT]: "You are the Integrated Vedic Therapy expert. Combine Yoga, Ayurveda, and Jyotish into a holistic health plan.",
    [GuruType.Corporate]: "You are the YogaX Corporate advisor. Focus on workplace wellness, stress reduction, and peak performance metrics.",
    [GuruType.Researcher]: "You are the Research Portal Assistant. Help researchers analyze biometric data and clinical markers."
  };

  const modelName = 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        // Ensure all history turns have roles and parts mapping correctly
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: systemInstructions[guru] || "You are a helpful wellness assistant.",
        temperature: 0.7,
      },
    });

    // Directly access response.text property instead of calling it as a method
    return response.text || "I am reflecting on your question. Could you try rephrasing?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The cosmic connection is currently interrupted. Please try again in a moment.";
  }
};
