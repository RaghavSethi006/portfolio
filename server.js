const express = require('express');
const fs = require('fs');
const path = require('path');
const setupProxy = require('./src/setupProxy');

const app = express();
const PORT = process.env.PORT || 3000;

// Attach proxy routes (/api/chat, /api/health)
setupProxy(app);

// Serve static assets from the React build folder (defer index.html to wildcard route)
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath, { index: false }));

app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  try {
    let html = fs.readFileSync(indexPath, 'utf8');
    const host = req.get('x-forwarded-host') || req.get('host');
    const proto = req.get('x-forwarded-proto') || req.protocol || 'https';
    const baseUrl =
      process.env.APP_URL ||
      (host && !host.startsWith('localhost') && !host.startsWith('127.0.0.1')
        ? `${proto}://${host}`
        : null);

    if (baseUrl) {
      const normalized = baseUrl.replace(/\/+$/, '');
      html = html.replace(/https:\/\/raghavsethi\.me/g, normalized);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  } catch (err) {
    return res.sendFile(indexPath);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on port ${PORT}`);
});
