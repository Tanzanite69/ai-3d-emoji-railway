export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.GOOGLE_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'Missing GOOGLE_API_KEY environment variable' });
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${API_KEY}`;

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {}),
    });

    const bodyText = await upstream.text();
    res.status(upstream.status).setHeader('Content-Type', 'application/json').send(bodyText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upstream request failed', details: String(err) });
  }
}
