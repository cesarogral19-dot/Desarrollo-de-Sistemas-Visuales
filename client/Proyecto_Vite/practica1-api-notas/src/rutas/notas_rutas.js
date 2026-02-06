const express = require('express');
const Nota = require('../modelos/nota');
const router = express.Router();

// --- RUTA GET (La que ves en el navegador) ---
router.get("/", async (req, res) => {
    try {
        const notas = await Nota.find().sort({ createdAt: -1 });
        
        // Mantenemos tu estructura original, solo cambiamos los textos
        res.status(200).json({
            status: "Servidor en línea ✅",
            notas_encontradas: notas.length,
            contenido: notas
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// --- RUTA POST (Crear nota) ---
router.post("/", async (req, res) => {
    try {
        const { texto } = req.body;
        if (!texto || texto.length < 5) {
            return res.status(400).json({ mensaje: "El texto debe ser más largo (mínimo 5 caracteres)" });
        }
        const nuevaNota = await Nota.create({ texto: texto.trim() });
        res.status(201).json(nuevaNota);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar la nota" });
    }
});

// --- RUTA DELETE (Limpiar todo) ---
router.delete('/limpiar', async (req, res) => {
    try {
        await Nota.deleteMany({});
        res.json({ mensaje: "Se han borrado todas las notas con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al limpiar la base de datos" });
    }
});

module.exports = router;