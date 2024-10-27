import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Use fetch to get data from APIs

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Function to fetch data from Wikipedia
async function fetchTechData(tech) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tech)}`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data.extract || 'No information available';
    }
    return 'No information available';
}

// POST route to compare two technologies
app.post('/compare', async (req, res) => {
    const { tech1, tech2 } = req.body;

    try {
        const tech1Info = await fetchTechData(tech1);
        const tech2Info = await fetchTechData(tech2);

        res.json({
            success: true,
            tech1,
            tech2,
            tech1Info,
            tech2Info
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Error fetching comparison data.'
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
