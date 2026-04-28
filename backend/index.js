const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let customers = [];
let nextId = 1;

app.get('/customers', (req, res) => {
  res.json(customers);
});

app.post('/customers', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const customer = { id: String(nextId++), name, email, phone };
  customers.push(customer);
  res.status(201).json(customer);
});

app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;
  const idx = customers.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  customers.splice(idx, 1);
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
