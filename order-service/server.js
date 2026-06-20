const express = require('express');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

let orders = [
  { id: 1, userId: 1, productId: 2, quantity: 1 },
  { id: 2, userId: 2, productId: 1, quantity: 3 }
];
let nextId = 3;

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'order-service' });
});

// GET /orders — list all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// GET /orders/:id — get one order
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// POST /orders — create a new order
app.post('/orders', (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'userId, productId and quantity are required' });
  }

  const newOrder = { id: nextId++, userId, productId, quantity };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});
