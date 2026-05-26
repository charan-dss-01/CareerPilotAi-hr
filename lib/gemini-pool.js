// ============================================================================
// Gemini API Key Pool - Round-robin rotation with automatic failover
// ============================================================================

const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
].filter(Boolean);

if (GEMINI_KEYS.length === 0) {
  console.error("⚠️ No Gemini API keys configured. Set GEMINI_API_KEY in env.");
}

let currentKeyIndex = 0;

/**
 * Gets the next API key in round-robin order
 * @returns {string}
 */
export function getNextGeminiKey() {
  if (GEMINI_KEYS.length === 0) {
    throw new Error("No Gemini API keys available");
  }

  const key = GEMINI_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % GEMINI_KEYS.length;
  return key;
}

/**
 * Executes a Gemini API call with automatic key rotation on 429 errors
 * @param {Function} apiCall - Async function that takes an API key and returns a promise
 * @param {number} maxRetries - Maximum retry attempts (default: number of keys)
 * @returns {Promise}
 */
export async function executeWithKeyRotation(apiCall, maxRetries = null) {
  const retries = maxRetries || GEMINI_KEYS.length;
  let lastError = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    const key = getNextGeminiKey();

    try {
      const result = await apiCall(key);
      return result;
    } catch (error) {
      lastError = error;

      // Check if it's a rate limit error (429 or quota exceeded)
      const isRateLimitError =
        error.status === 429 ||
        error.message?.includes("quota") ||
        error.message?.includes("rate limit");

      if (isRateLimitError && attempt < retries - 1) {
        console.warn(
          `⚠️ Gemini API rate limit hit on key ${attempt + 1}/${GEMINI_KEYS.length}. Rotating to next key...`
        );
        continue; // Try next key
      }

      // If it's not a rate limit error, or we're out of retries, throw
      throw error;
    }
  }

  throw (
    lastError || new Error("All Gemini API keys exhausted. Please try again later.")
  );
}

/**
 * Gets the total number of configured API keys
 * @returns {number}
 */
export function getKeyPoolSize() {
  return GEMINI_KEYS.length;
}
