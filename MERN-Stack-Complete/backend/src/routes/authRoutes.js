/**
 * Rutas de Autenticación
 */

import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Registrar nuevo usuario
 */
router.post(
  '/register',
  [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('El nombre es requerido')
      .isLength({ min: 2 })
      .withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('El apellido es requerido')
      .isLength({ min: 2 })
      .withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El email es requerido')
      .isEmail()
      .withMessage('Proporciona un email válido'),
    body('password')
      .notEmpty()
      .withMessage('La contraseña es requerida')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirma tu contraseña'),
  ],
  handleValidationErrors,
  authController.register
);

/**
 * POST /api/auth/login
 * Login de usuario
 */
router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El email es requerido')
      .isEmail()
      .withMessage('Proporciona un email válido'),
    body('password')
      .notEmpty()
      .withMessage('La contraseña es requerida'),
  ],
  handleValidationErrors,
  authController.login
);

/**
 * POST /api/auth/logout
 * Logout
 */
router.post('/logout', authenticate, authController.logout);

/**
 * GET /api/auth/me
 * Obtener usuario actual
 */
router.get('/me', authenticate, authController.getCurrentUser);

/**
 * PUT /api/auth/profile
 * Actualizar perfil
 */
router.put('/profile', authenticate, authController.updateProfile);

/**
 * POST /api/auth/change-password
 * Cambiar contraseña
 */
router.post(
  '/change-password',
  authenticate,
  [
    body('currentPassword')
      .notEmpty()
      .withMessage('Proporciona tu contraseña actual'),
    body('newPassword')
      .notEmpty()
      .withMessage('Proporciona una nueva contraseña')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirma tu nueva contraseña'),
  ],
  handleValidationErrors,
  authController.changePassword
);

export default router;
