const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// In-memory "database" — fine for a student project,
// swap for a real DB (MongoDB/Postgres) later if needed.
let users = [
  { id: 1, name: 'Alice Sharma', email: 'alice@example.com' },
  { id: 2, name: 'Bob Verma', email: 'bob@example.com' }
];
let nextId = 3;

// Health check — useful once this is containerized / load balanced
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'user-service' });
});

// GET /users — list all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id — get one user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /users — create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});
