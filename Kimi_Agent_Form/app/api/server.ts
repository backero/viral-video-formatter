import express from 'express';
import extractNuggets from './extract-nuggets.js';
import generateScreenplay from './generate-screenplay.js';
import validateScreenplay from './validate-screenplay.js';

const app = express();
const PORT = 3001;

app.use(express.json());

// API Routes
app.post('/api/extract-nuggets', async (req, res) => {
  await extractNuggets(req, res);
});

app.post('/api/generate-screenplay', async (req, res) => {
  await generateScreenplay(req, res);
});

app.post('/api/validate-screenplay', async (req, res) => {
  await validateScreenplay(req, res);
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
