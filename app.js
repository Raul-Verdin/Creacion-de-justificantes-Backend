// app.js
const express = require('express');
const cors = require('cors');
const solicitudesRoutes = require('./routes/solicitudes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Orígenes permitidos para CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://olivedrab-tarsier-158864.hostingersite.com"
];

// Configurar CORS
app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como Postman) o en lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
}));

// Rutas
app.use('/solicitudes', solicitudesRoutes);

module.exports = app;
