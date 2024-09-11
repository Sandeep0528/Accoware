const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = 'YOUR_GNEWS_API_KEY'; // Replace with your API key

app.use(cors()); // Allow CORS for frontend access

app.get('/api/articles', async (req, res) => {
    try {
        const { search = '', page = 1, pageSize = 10, country = 'all', language = 'all', category = '' } = req.query;
        const url = `https://gnews.io/api/v4/search?q=${search}&page=${page}&token=${apiKey}&country=${country}&language=${language}&category=${category}`;

        const response = await axios.get(url);
        const articles = response.data.articles;
        const totalPages = Math.ceil(response.data.totalArticles / pageSize);

        res.json({ articles, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching articles' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});