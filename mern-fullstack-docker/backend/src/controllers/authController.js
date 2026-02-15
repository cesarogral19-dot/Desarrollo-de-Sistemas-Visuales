const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const createToken = require('../utils/createToken')

exports.register = async (req, res, next) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if(existing) return res.status(400).json({ message: 'Email ya registrado' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    const token = createToken(user)
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  }catch(err){ next(err) }
}

exports.login = async (req, res, next) => {
  try{
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(!user) return res.status(400).json({ message: 'Usuario no encontrado' })
    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(400).json({ message: 'Contraseña incorrecta' })
    const token = createToken(user)
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  }catch(err){ next(err) }
}

exports.me = async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })
  }catch(err){ next(err) }
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.json({ ok: true })
}
