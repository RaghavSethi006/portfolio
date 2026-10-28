const express = require('express');
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

function getApiKey() {
  const envKey = process.env.GEMINI_API_KEY;
  if (envKey && envKey !== 'MY_GEMINI_API_KEY' && envKey.trim().length > 10) {
    return envKey.trim();
  }
  // Fallback to .env.local if available
  try {
    const envPath = path.join(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
      if (match && match[1] && match[1].trim() !== 'MY_GEMINI_API_KEY') {
        return match[1].trim();
      }
    }
  } catch (_) {}
  return envKey;
}

function getGeminiClient() {
  const apiKey = getApiKey();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
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
// 1. User env override (GEMINI_MODEL) if provided
// 2. gemini-flash-lite-latest (fastest & cheapest dynamic alias)
// 3. gemini-3.1-flash-lite (fast lightweight model)
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
    throw new Error('GEMINI_API_KEY is not configured or is invalid on the server.');
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

module.exports = function (app) {
  app.use(express.json());

  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, systemPrompt } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      // Convert messages to Gemini format: role 'user' or 'model'
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
      res.flushHeaders?.();

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
  });

  app.get('/api/health', (req, res) => {
    const key = getApiKey();
    res.json({
      status: 'ok',
      hasApiKey: !!(key && key !== 'MY_GEMINI_API_KEY'),
      keyLength: key ? key.length : 0,
      cachedModel: cachedWorkingModel,
    });
  });
};
