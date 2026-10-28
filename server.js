const express = require('express');
const path = require('path');
const setupProxy = require('./src/setupProxy');

const app = express();
const PORT = process.env.PORT || 3000;

// Attach proxy routes (/api/chat, /api/health)
setupProxy(app);

// Serve static assets from the React build folder
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on port ${PORT}`);
});
