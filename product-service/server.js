const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

let products = [
  { id: 1, name: 'Wireless Mouse', price: 599 },
  { id: 2, name: 'Mechanical Keyboard', price: 2499 }
];
let nextId = 3;

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'product-service' });
});

// GET /products — list all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id — get one product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST /products — create a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name and price are required' });
  }

  const newProduct = { id: nextId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
});
