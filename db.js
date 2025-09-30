// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // host que te da Railway
  user: process.env.DB_USER,       // usuario
  password: process.env.DB_PASSWORD, // contraseña
  database: process.env.DB_NAME,     // nombre de BD
  port: process.env.DB_PORT || 3306  // Railway da el puerto
});

connection.connect((err) => {
  if (err) throw err;
  console.log('📦 Conexión a MySQL exitosa');
});

module.exports = connection;
