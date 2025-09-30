const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));

app.use(express.json());

module.exports = app;
