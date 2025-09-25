import { useEffect, useState } from 'react';

export default function Consultar() {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetch('/api/listar')
      .then(res => res.json())
      .then(data => setSolicitudes(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Justificantes Registrados</h1>
      <ul>
        {solicitudes.map(s => (
          <li key={s.id}>
            <strong>{s.nombre}</strong> - {s.grupo} - {s.motivo} - {s.fecha_ausencia} - {s.fecha_solicitud}
          </li>
        ))}
      </ul>
    </div>
  );
}
