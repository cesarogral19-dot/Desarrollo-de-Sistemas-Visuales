/**
 * Middleware de Validación
 * Valida datos de entrada usando express-validator
 */

import { validationResult } from 'express-validator';

/**
 * Middleware para manejar errores de validación
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Formato personalizado de errores
    const formattedErrors = errors.array().reduce((acc, error) => {
      const field = error.param;
      acc[field] = error.msg;
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: formattedErrors,
    });
  }

  next();
};

/**
 * Middleware de manejo de errores centralizado
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors,
    });
  }

  // Errores de llave duplicada
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `El ${field} ya existe`,
    });
  }

  // Error por defecto
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
  });
};

/**
 * Wrapper para manejar errores en async/await
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default {
  handleValidationErrors,
  errorHandler,
  asyncHandler,
};
