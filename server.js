import express from 'express';

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(express.static('public'));

// Toggleable endpoint via env
const DEFAULT_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict';
const ALT_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/imagegeneration:generate';

app.post('/api/generate', async (req, res) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'Missing GOOGLE_API_KEY environment variable' });

  const useAlt = process.env.GOOGLE_IMAGE_ENDPOINT === 'imagegeneration';
  const endpoint = `${useAlt ? ALT_ENDPOINT : DEFAULT_ENDPOINT}?key=${API_KEY}`;

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {}),
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upstream request failed', details: String(err) });
  }
});

app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
