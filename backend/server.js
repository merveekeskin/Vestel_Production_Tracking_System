const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// SQL bağlantısı dosyamız
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Public klasörünü frontend için açıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const uretimRoutes = require('./routes/uretim');
app.use('/api/uretim', uretimRoutes);

// Server başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} üzerinde çalışıyor`);
});
