const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create table to store sensor data
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS water_level (timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, value INTEGER)");
});

// Serve static files
app.use(express.static('public'));

// API endpoint to fetch sensor data
app.get('/api/water_level', (req, res) => {
    db.all("SELECT * FROM water_level", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});