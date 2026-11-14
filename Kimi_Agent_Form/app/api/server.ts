import express from 'express';
import extractNuggets from './extract-nuggets.js';
import generateScreenplay from './generate-screenplay.js';
import validateScreenplay from './validate-screenplay.js';
import saveContent from './save-content.js';
import getContent from './content/[contentId].js';

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/api/extract-nuggets', async (req, res) => {
  await extractNuggets(req, res);
});

app.post('/api/generate-screenplay', async (req, res) => {
  await generateScreenplay(req, res);
});

app.post('/api/validate-screenplay', async (req, res) => {
  await validateScreenplay(req, res);
});

app.post('/api/save-content', async (req, res) => {
  await saveContent(req, res);
});

app.get('/api/content/:contentId', async (req, res) => {
  req.query.contentId = req.params.contentId;
  await getContent(req, res);
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
