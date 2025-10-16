const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YeniSifre123!',
  database: 'staj_project',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});
// Makine durumu route
app.get('/api/makine_durumu', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ms.status_id, ms.machine_id, ms.temperature, ms.humidity, ms.stage, ms.status_date, ms.date
      FROM machinestatus ms
      JOIN machines m ON ms.machine_id = m.machine_id
      ORDER BY ms.status_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Makine durumu DB hatası:', err);
    res.status(500).json({ error: 'Makine durumu DB hatası' });
  }
});

app.listen(PORT, () => {
  console.log(`Makine durumu server running at http://localhost:${PORT}`);
});
