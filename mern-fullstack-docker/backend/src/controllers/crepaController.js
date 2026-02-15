const Crepa = require('../models/Crepa')

// Obtener todas
exports.getAll = async (req, res) => {
  try {
    const crepas = await Crepa.find()
    res.json(crepas)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Crear
exports.create = async (req, res) => {
  try {
    const crepa = await Crepa.create(req.body)
    res.status(201).json(crepa)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Actualizar
exports.update = async (req, res) => {
  try {
    const crepa = await Crepa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(crepa)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Eliminar
exports.delete = async (req, res) => {
  try {
    await Crepa.findByIdAndDelete(req.params.id)
    res.json({ message: 'Crepa eliminada' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
