const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for front-end communication
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic API routes (example)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});