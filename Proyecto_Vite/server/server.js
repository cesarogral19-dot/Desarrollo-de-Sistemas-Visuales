const express = require('express');
const cors = require('cors');
const notasRoutes = require('./routes/notas');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/notas', notasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: ' Servidor ejecutándose correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(` API disponible en http://localhost:${PORT}/api/notas`);
});
