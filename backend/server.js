const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "finsmart",
    password: "password",
    port: 5432,
});

app.use(express.json());

// Register endpoint
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
            [username, email, hashedPassword]
        );
        res.status(201).json({ userId: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ userId: user.id }, "your_jwt_secret");
                res.json({ token });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch data endpoints
const fetchAlphaVantageData = () => {
    const data = require("./scripts/alpha_vantage_data.json");
    return data;
};

const fetchIexCloudData = () => {
    const data = require("./scripts/iex_cloud_data.json");
    return data;
};

const fetchNasdaqData = () => {
    const data = require("./scripts/nasdaq_data.json");
    return data;
};

app.get("/api/alpha-vantage", (req, res) => {
    const data = fetchAlphaVantageData();
    res.json(data);
});

app.get("/api/iex-cloud", (req, res) => {
    const data = fetchIexCloudData();
    res.json(data);
});

app.get("/api/nasdaq", (req, res) => {
    const data = fetchNasdaqData();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
