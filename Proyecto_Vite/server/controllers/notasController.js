const Nota = require('../models/Nota');

const obtenerNotas = (req, res) => {
  try {
    const notas = Nota.obtenerTodas();
    console.log(` GET /api/notas - Se obtuvieron ${notas.length} notas`);
    res.status(200).json({
      success: true,
      mensaje: 'Notas obtenidas correctamente',
      cantidad: notas.length,
      data: notas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener notas',
      error: error.message
    });
  }
};

const crearNota = (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
      return res.status(400).json({
        success: false,
        mensaje: 'El título y contenido son requeridos'
      });
    }

    const nuevaNota = Nota.crear(titulo, contenido);
    console.log(` POST /api/notas - Nueva nota creada`);
    res.status(201).json({
      success: true,
      mensaje: 'Nota creada correctamente',
      data: nuevaNota
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al crear nota',
      error: error.message
    });
  }
};

module.exports = {
  obtenerNotas,
  crearNota
};
