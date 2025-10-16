const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // GET all
  router.get('/productionorders', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM productionorders');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB listeleme hatası' });
    }
  });

  // POST new
  router.post('/productionorders', async (req, res) => {
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
  router.delete('/productionorders/:id', async (req, res) => {
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

  return router;
};
