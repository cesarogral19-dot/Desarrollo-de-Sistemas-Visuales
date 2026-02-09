const express = require('express');
const { obtenerNotas, crearNota } = require('../controllers/notasController');

const router = express.Router();

router.get('/', obtenerNotas);
router.post('/', crearNota);

module.exports = router;
