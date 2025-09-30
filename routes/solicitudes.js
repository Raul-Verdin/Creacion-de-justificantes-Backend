const express = require('express');
const router = express.Router();
const db = require('../db');

// Utilidad para manejar errores
const handleDbError = (res, msg) => res.status(500).json({ error: msg });

// GET: Obtener todas las solicitudes
router.get('/', (req, res) => {
  const query = 'SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC';

  db.query(query, (err, results) => {
    if (err) return handleDbError(res, 'Error al obtener solicitudes');
    res.json(results);
  });
});

// POST: Crear nueva solicitud
router.post('/', (req, res) => {
  const { nombre, grupo, motivo, fecha_ausencia } = req.body;

  if (!nombre || !grupo || !motivo || !fecha_ausencia) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = `
    INSERT INTO solicitudes (nombre, grupo, motivo, fecha_ausencia)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [nombre, grupo, motivo, fecha_ausencia], (err, result) => {
    if (err) return handleDbError(res, 'Error al guardar la solicitud');
    res.status(201).json({ mensaje: 'Solicitud registrada', id: result.insertId });
  });
});

// GET: Obtener solicitud por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM solicitudes WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) return handleDbError(res, 'Error al obtener la solicitud');
    if (results.length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    res.json(results[0]);
  });
});

module.exports = router;
