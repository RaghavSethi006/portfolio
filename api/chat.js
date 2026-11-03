const { GoogleGenAI } = require('@google/genai');

function getApiKey() {
  const envKey = (
    process.env.GEMINI_API_KEY ||
    process.env.REACT_APP_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_KEY ||
    ''
  )
    .trim()
    .replace(/^["']|["']$/g, '');

  if (envKey && envKey !== 'MY_GEMINI_API_KEY' && envKey.length > 5) {
    return envKey;
  }

  // Fallback to local .env.local if present in development
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
      if (match && match[1]) {
        const val = match[1].trim().replace(/^["']|["']$/g, '');
        if (val && val !== 'MY_GEMINI_API_KEY') {
          return val;
        }
      }
    }
  } catch (_) {}

  return null;
}

function getGeminiClient() {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Future-proof model priority list:
// 1. Optional user environment override (GEMINI_MODEL)
// 2. gemini-flash-lite-latest (fastest & cheapest dynamic alias)
// 3. gemini-3.1-flash-lite (ultra-fast lightweight flash model)
// 4. gemini-flash-latest (general latest flash model alias)
// 5. gemini-3.8-flash (flagship flash model)
const FALLBACK_MODELS = [
  process.env.GEMINI_MODEL,
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
].filter(Boolean);

let cachedWorkingModel = null;

async function getStreamWithFallback(contents, config) {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error(
      'GEMINI_API_KEY is not configured or is empty. Please set GEMINI_API_KEY in your Vercel Project Settings > Environment Variables, and trigger a Redeploy.'
    );
  }

  const modelsToTry = cachedWorkingModel
    ? [cachedWorkingModel, ...FALLBACK_MODELS.filter((m) => m !== cachedWorkingModel)]
    : FALLBACK_MODELS;

  let lastError = null;
  for (const model of modelsToTry) {
    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents,
        config,
      });
      cachedWorkingModel = model;
      return { stream, model };
    } catch (err) {
      console.warn(`[Gemini API] Model '${model}' failed: ${err.message}. Retrying fallback...`);
      lastError = err;
    }
  }
  throw lastError || new Error('No available Gemini model found.');
}

async function parseBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch (_) {
        return {};
      }
    }
    return req.body;
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (_) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async function handler(req, res) {
  // CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = await parseBody(req);
    const { messages, systemPrompt } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const contents = messages
      .filter((m) => !m.isSystem && m.content)
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content) }],
      }));

    if (contents.length === 0) {
      return res.status(400).json({ error: 'No valid user or assistant messages found.' });
    }

    const config = {
      temperature: 0.7,
    };

    if (systemPrompt) {
      config.systemInstruction = systemPrompt;
    }

    const { stream, model } = await getStreamWithFallback(contents, config);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    if (res.flushHeaders) res.flushHeaders();

    for await (const chunk of stream) {
      const text = chunk.text || '';
      if (text) {
        res.write(`data: ${JSON.stringify({ text, model })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('[Gemini /api/chat Error]:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message || 'Internal server error while communicating with Gemini.',
      });
    }
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
};
