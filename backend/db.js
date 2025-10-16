const sql = require('mssql');

// SQL Server bağlantı ayarları
const config = {
  user: 'kullanici_adin',       // SQL Server kullanıcı adın
  password: 'sifren',           // SQL Server şifren
  server: 'localhost',          // SQL Server sunucu adı (ör: 'localhost' veya 'DESKTOP-XXXX\\SQLEXPRESS')
  database: 'staj_project',     // kendi veritabanı adın
  options: {
    encrypt: false,             // Azure değilse genelde false
    trustServerCertificate: true
  }
};

// Tek bağlantı havuzu oluşturma
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ SQL Server bağlantısı başarılı!');
    return pool;
  })
  .catch(err => {
    console.error('❌ SQL Server bağlantı hatası:', err);
  });

module.exports = {
  sql, poolPromise
};
