const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const cors = require('cors');
app.use(cors());


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MySQL bağlantısı
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YeniSifre123!',
  database: 'staj_project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/api/login', async (req, res) => {
  const { employee_no, password, role } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM employees WHERE employee_no = ? AND role = ?',
      [employee_no, role]
    );

    if (rows.length === 0) return res.status(401).json({ error: 'Kullanıcı bulunamadı veya rol hatalı' });

    // Şifre kontrolü
    if (rows[0].password !== password) {
      return res.status(401).json({ error: 'Şifre hatalı' });
    }

    res.json({ message: 'Giriş başarılı', employee: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});
