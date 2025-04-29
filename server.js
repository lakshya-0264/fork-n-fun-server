const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { API_URL, MENU_API} = require('./constants.js');

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/', (req, res) => {
    res.send(`
        <h1>🍴 Fork-N-Fun API Server</h1>
        <p>Welcome to the backend server of the <strong>Fork-N-Fun</strong> food delivery app.</p>
        <h3>Available Endpoints:</h3>
        <ul>
            <li><a href="/api/restaurants">/api/restaurants</a> – Fetch restaurant list</li>
            <li><code>/api/menu/:resId</code> – Fetch menu by restaurant ID</li>
        </ul>
        <h3>Project Links:</h3>
        <ul>
            <li>🌐 Frontend: <a href="https://fork-n-fun.vercel.app" target="_blank">https://fork-n-fun.vercel.app</a></li>
            <li>🧠 Backend: <a href="https://fork-n-fun-server.onrender.com" target="_blank">https://fork-n-fun-server.onrender.com</a></li>
            <li>📁 GitHub Repo: <a href="https://github.com/lakshya-0264/fork-n-fun-server" target="_blank">https://github.com/lakshya-0264/fork-n-fun-server</a></li>
        </ul>
    `);
});


app.get('/api/restaurants', async (req, res) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                // If needed:
                // 'x-platform': 'web',
                // 'x-device-id': 'some-random-uuid',
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching from Swiggy:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from Swiggy' });
    }
});

// In server.js

app.get('/api/menu/:resId', async (req, res) => {
    const { resId } = req.params;
    try {
        const response = await axios.get(`${MENU_API}${resId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching menu for restaurant ${resId}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch menu data' });
    }
});


app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});


// Run using command: "node server.js"