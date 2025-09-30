const request = require('supertest');
const app = require('../app'); // NO index.js
const db = require('../db');   // ahora sí db es correcto

describe('API Solicitudes', () => {
  test('GET /solicitudes responde con un array', async () => {
    const res = await request(app).get('/solicitudes');
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /solicitudes con campos vacíos responde error 400', async () => {
    const res = await request(app)
      .post('/solicitudes')
      .send({});
    expect(res.statusCode).toBe(400);
  });
});

// 🔴 Esto es importante para cerrar la conexión
afterAll(() => {
  db.end(); 
});
