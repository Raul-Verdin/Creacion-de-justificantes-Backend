import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, grupo, motivo, fecha_ausencia } = req.body;

    try {
      const [result] = await pool.execute(
        'INSERT INTO solicitudes (nombre, grupo, motivo, fecha_ausencia) VALUES (?, ?, ?, ?)',
        [nombre, grupo, motivo, fecha_ausencia]
      );

      res.status(200).json({ success: true, id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error al registrar' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
