const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENROUTER_API_KEY;
const API_BASE = 'https://openrouter.ai/api/v1';

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use('/api/', rateLimit({ windowMs: 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ ok: true, configured: Boolean(API_KEY) }));
app.get('/api/models', async (_req, res) => {
  if (!API_KEY) return res.status(503).json({ error: 'Le serveur doit être configuré par son propriétaire.' });
  try {
    const upstream = await fetch(`${API_BASE}/models`, { headers: { Authorization: `Bearer ${API_KEY}` } });
    const data = await upstream.json();
    if (!upstream.ok) return res.status(upstream.status).json({ error: data.error?.message || 'Erreur du fournisseur IA.' });
    const free = (data.data || []).filter(m => m.id === 'openrouter/free' || m.id.endsWith(':free'));
    if (!free.some(m => m.id === 'openrouter/free')) free.unshift({ id: 'openrouter/free', name: 'OpenRouter Free — sélection automatique' });
    res.json({ data: free });
  } catch { res.status(502).json({ error: 'Impossible de joindre le fournisseur IA.' }); }
});
app.post('/api/chat', async (req, res) => {
  if (!API_KEY) return res.status(503).json({ error: 'Le serveur CART3R n’est pas encore configuré.' });
  const { model, messages, temperature } = req.body || {};
  if (typeof model !== 'string' || !Array.isArray(messages) || messages.length > 40 || messages.some(m => !m || !['user','assistant','system'].includes(m.role) || typeof m.content !== 'string' || m.content.length > 12000)) {
    return res.status(400).json({ error: 'Message invalide ou trop long.' });
  }
  try {
    const upstream = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, temperature: Number.isFinite(temperature) ? temperature : 0.7 })
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch { res.status(502).json({ error: 'Le fournisseur IA ne répond pas pour le moment.' }); }
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/{*splat}', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`CART3R AI prêt sur le port ${PORT}`));
