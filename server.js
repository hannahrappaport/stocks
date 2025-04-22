const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// View 1: Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// View 2: Process View (handle GET request from form)
app.get('/process', (req, res) => {
  const query = req.query.query;
  const type = req.query.type;

  res.send(`<h2>You searched for ${type === 'ticker' ? 'Ticker Symbol' : 'Company Name'}: ${query}</h2>`);
});

app.listen(PORT, () => {
  console.log(`✅ App running on http://localhost:${PORT}`);
});
