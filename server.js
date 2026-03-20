const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); 

// Initialize DB
connectDB();

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Welcome to the Purple Cream API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});