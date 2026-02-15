const jwt = require('jsonwebtoken')

exports.authMiddleware = (req, res, next) => {
  try{
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1])
    if(!token) return res.status(401).json({ message: 'No autorizado' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = { id: decoded.id, role: decoded.role }
    next()
  }catch(err){ return res.status(401).json({ message: 'Token inválido' }) }
}
