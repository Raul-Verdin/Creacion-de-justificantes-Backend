import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.execute('SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error al obtener los datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
