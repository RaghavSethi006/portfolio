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
  return null;
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const key = getApiKey();
  res.status(200).json({
    status: 'ok',
    hasApiKey: !!key,
    keyLength: key ? key.length : 0,
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? 'vercel' : 'local',
  });
};
