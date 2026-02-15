const mongoose = require('mongoose')

const crepaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Crepa', crepaSchema)
