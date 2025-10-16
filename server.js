const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// GET all
app.get('/api/productionorders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productionorders');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB listeleme hatası' });
  }
});

// POST new
app.post('/api/productionorders', async (req, res) => {
  try {
    const data = req.body;
    const [result] = await pool.query('INSERT INTO productionorders SET ?', [data]);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB ekleme hatası' });
  }
});

// DELETE
app.delete('/api/productionorders/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM productionorders WHERE production_order_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json({ message: 'Sipariş silindi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB silme hatası' });
  }
});

// server.js

const loginRouter = require('./login');

// Diğer middleware ve productionorders endpoint’lerinden önce
app.use('/api', loginRouter);




// ------------------ CATCH-ALL ------------------
app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found' }));
