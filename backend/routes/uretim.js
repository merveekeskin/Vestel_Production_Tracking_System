const express = require('express');
const router = express.Router();
const sql = require('../db');

// Yeni üretim talebi ekleme
router.post('/talep', async (req, res) => {
    try {
        const { urun_adi, miktar, tarih, aciklama } = req.body;

        if (!urun_adi || !miktar || !tarih) {
            return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
        }

        const request = new sql.Request();
        const result = await request
            .input('urun_adi', sql.VarChar, urun_adi)
            .input('miktar', sql.Int, miktar)
            .input('tarih', sql.Date, tarih)
            .input('aciklama', sql.VarChar, aciklama || null)
            .query(`
                INSERT INTO UretimTalep (urun_adi, miktar, tarih, aciklama)
                OUTPUT INSERTED.id
                VALUES (@urun_adi, @miktar, @tarih, @aciklama)
            `);

        res.json({ id: result.recordset[0].id, message: 'Talep başarıyla eklendi' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

module.exports = router;
