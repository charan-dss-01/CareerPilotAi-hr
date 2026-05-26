import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

let model = null;

if (GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
}

function extractJsonBlock(text) {
  const cleaned = String(text || "")
    .replace(/```(?:json)?\s*/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON object found in model response");
  }

  return match[0];
}

function withTimeout(promise, timeoutMs, timeoutMessage) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    }),
  ]);
}

export function ensureGeminiConfigured() {
  if (!GEMINI_API_KEY || !model) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
}

export async function generateGeminiJson(prompt, timeoutMs = 20000) {
  ensureGeminiConfigured();

  const result = await withTimeout(
    model.generateContent(prompt),
    timeoutMs,
    "Gemini request timed out",
  );

  const text = result?.response?.text?.() || "";
  const jsonBlock = extractJsonBlock(text);
  return JSON.parse(jsonBlock);
}

export function sanitizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

export function parseCsvParam(paramValue) {
  if (!paramValue) return [];
  return String(paramValue)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function clampNumber(value, min, max, fallback = min) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}
