require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBaseDeDatos = require('./bd'); // Importa tu conexión
const rutasNotas = require('./rutas/notas_rutas'); // Importa el archivo que acabas de hacer

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Necesario para que el POST lea el "texto"

// Rutas - Aquí conectamos tu archivo notas.rutas.js
app.use('/api/notas', rutasNotas);

// Healthcheck (buena práctica)
app.use('/api/salud', (req, res) => res.json({ estado: "servidor funcionando" }));

const PUERTO = process.env.PUERTO || 4000;

// Iniciamos conexión y luego el servidor
conectarBaseDeDatos(process.env.URI_MONGO).then(() => {
    app.listen(PUERTO, () => {
        console.log(`✅ Servidor en puerto ${PUERTO}`);
        console.log(`🚀 Prueba el GET en: http://localhost:${PUERTO}/api/notas`);
    });
}).catch(err => {
    console.error("❌ Falló el inicio del servidor:", err);
});