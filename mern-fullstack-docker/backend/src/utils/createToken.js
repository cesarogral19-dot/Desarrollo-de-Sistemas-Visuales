const jwt = require('jsonwebtoken')

module.exports = function createToken(user){
  const payload = { id: user._id, role: user.role }
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
}
