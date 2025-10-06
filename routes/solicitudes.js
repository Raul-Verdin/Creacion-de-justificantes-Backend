const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Obtener todas las solicitudes
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC');
    res.json(results);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});

// POST: Crear nueva solicitud
router.post('/', async (req, res) => {
  const { nombre, grupo, motivo, fecha_ausencia } = req.body;

  if (!nombre || !grupo || !motivo || !fecha_ausencia) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO solicitudes (nombre, grupo, motivo, fecha_ausencia) VALUES (?, ?, ?, ?)`,
      [nombre, grupo, motivo, fecha_ausencia]
    );

    res.status(201).json({ mensaje: 'Solicitud registrada', id: result.insertId });
  } catch (error) {
    console.error('Error al guardar solicitud:', error);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
});

// GET: Obtener solicitud por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await db.query('SELECT * FROM solicitudes WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Error al obtener solicitud:', error);
    res.status(500).json({ error: 'Error al obtener la solicitud' });
  }
});

module.exports = router;
