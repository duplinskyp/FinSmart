const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/api/sentiment", async (req, res) => {
    const { text } = req.body;
    const api_key = "7006b9b4913a1885c8e3ed71558c8c64";
    const url = `https://api.meaningcloud.com/sentiment-2.1`;

    try {
        const response = await axios.post(url, null, {
            params: {
                key: api_key,
                txt: text,
                lang: "en"
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sentiment analysis" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
