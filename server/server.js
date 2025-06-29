const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  const { country, category, page, pageSize } = req.query;
  const apiKey = process.env.NEWS_API_KEY;
  // console.log("✅ API Key being used:", process.env.NEWS_API_KEY);

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// app.listen(PORT, () => {
//   console.log(`✅ Server listening on port ${PORT}`);
// });
app.listen(PORT);

