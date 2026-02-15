const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      crepa: { type: mongoose.Schema.Types.ObjectId, ref: 'Crepa' },
      quantity: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    enum: ['pendiente', 'preparando', 'lista', 'entregada'],
    default: 'pendiente'
  }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
