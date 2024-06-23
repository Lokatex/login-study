const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now();
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const updatedItem = req.body;
  updatedItem.id = itemId;
  res.json(updatedItem);
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  res.status(204).send();
});
