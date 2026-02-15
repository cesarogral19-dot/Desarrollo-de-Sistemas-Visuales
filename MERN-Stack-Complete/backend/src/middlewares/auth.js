/**
 * Middleware de Autenticación
 * Valida JWT y extrae información del usuario
 */

import jwt from 'jsonwebtoken';

/**
 * Middleware para proteger rutas
 * Verifica que exista un token válido
 */
export const authenticate = (req, res, next) => {
  try {
    // Obtener token de headers o cookies
    const token =
      req.headers.authorization?.replace('Bearer ', '') ||
      req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado',
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;

    next();
  } catch (error) {
    console.error('Error de autenticación:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'El token ha expirado',
      });
    }

    res.status(401).json({
      success: false,
      message: 'Token inválido',
    });
  }
};

/**
 * Middleware RBAC (Role-Based Access Control)
 * Valida que el usuario tenga los permisos necesarios
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado',
      });
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a este recurso',
      });
    }

    next();
  };
};

export default { authenticate, authorize };
