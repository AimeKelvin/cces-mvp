import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const classifyComplaint = async (text) => {
  const prompt = `
  Classify this complaint:
  "${text}"

  Choose only from:
  - Water & Sanitation
  - Electricity
  - Waste Management
  - Roads & Infrastructure
  - Security
  - General

  Just respond with the category.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};
