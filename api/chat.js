import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from './prompt.js';

let redis = null;
async function getRedis() {
  if (redis) return redis;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const { Redis } = await import('@upstash/redis');
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    return redis;
  }
  return null;
}

async function logConversation(question, answer) {
  try {
    const kv = await getRedis();
    if (!kv) return;

    const entry = {
      question,
      answer,
      timestamp: new Date().toISOString(),
    };

    await kv.lpush('portfolio:conversations', JSON.stringify(entry));
    await kv.ltrim('portfolio:conversations', 0, 499);
  } catch {
    // logging should never break the chat
  }
}

function validateInput(message) {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Please enter a question.' };
  }

  const trimmed = message.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Please enter a question.' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Please keep your question under 500 characters.' };
  }

  return { valid: true, message: trimmed };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.Portfolio_gemini_key ||
    process.env.PORTFOLIO_GEMINI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AI service not configured. Please try again later.' });
  }

  try {
    const { message, history = [] } = req.body;

    const validation = validateInput(message);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const chatHistory = history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.parts?.[0]?.text || msg.text || '' }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(validation.message);

    const parts = result.response.candidates?.[0]?.content?.parts;
    let responseText =
      parts?.length && parts[0].text != null
        ? String(parts[0].text)
        : '';

    if (!responseText.trim()) {
      responseText =
        "I couldn't generate a reply for that. Try rephrasing or asking something else about Anannya's experience, skills, or projects.";
    }

    const sectionMatch = responseText.match(/SECTIONS:\s*(.+)$/im);
    let reply = responseText;
    let sections = [];

    if (sectionMatch) {
      reply = responseText.replace(/SECTIONS:\s*(.+)$/im, '').trim();
      sections = sectionMatch[1]
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter((s) =>
          ['about', 'work', 'research', 'projects', 'experience', 'skills', 'education', 'contact'].includes(s)
        );
    }

    logConversation(validation.message, reply);

    return res.status(200).json({ reply, sections });
  } catch (err) {
    console.error('Chat API error:', err.message, err.code ?? '');
    return res.status(500).json({
      error: 'Something went wrong. Please try again in a moment.',
    });
  }
}
