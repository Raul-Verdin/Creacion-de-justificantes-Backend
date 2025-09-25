import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ nombre: '', grupo: '', motivo: '', fecha_ausencia: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      setMensaje('Justificante registrado correctamente');
      setForm({ nombre: '', grupo: '', motivo: '', fecha_ausencia: '' });
    } else {
      setMensaje('Error al registrar');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Registrar Justificante de Ausencia</h1>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required /><br />
        <input name="grupo" placeholder="Grupo" value={form.grupo} onChange={handleChange} required /><br />
        <textarea name="motivo" placeholder="Motivo" value={form.motivo} onChange={handleChange} required /><br />
        <input type="date" name="fecha_ausencia" value={form.fecha_ausencia} onChange={handleChange} required /><br />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
