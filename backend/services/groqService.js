import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config(); 

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateSummary = async (text, prompt) => {
  const fullPrompt = `${prompt}\n\n${text}`;

  const response = await groq.chat.completions.create({
    messages: [{ role: 'user', content: fullPrompt }],
    model: 'openai/gpt-oss-20b',
  });

  return response.choices[0]?.message?.content || '⚠️ No summary generated.';
};
