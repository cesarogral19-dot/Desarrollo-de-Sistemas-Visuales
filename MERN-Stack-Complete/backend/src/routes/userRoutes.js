/**
 * Rutas de Usuarios
 */

import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Aplicar autenticación a todas las rutas
router.use(authenticate);

// Aplicar autorización de admin a todas las rutas
router.use(authorize('ADMIN'));

/**
 * GET /api/users
 * Obtener todos los usuarios
 */
router.get('/', userController.getAllUsers);

/**
 * GET /api/users/:id
 * Obtener usuario por ID
 */
router.get('/:id', userController.getUserById);

/**
 * PUT /api/users/:id
 * Actualizar usuario
 */
router.put('/:id', userController.updateUser);

/**
 * PATCH /api/users/:id/role
 * Cambiar role
 */
router.patch('/:id/role', userController.changeUserRole);

/**
 * PATCH /api/users/:id/status
 * Cambiar estado
 */
router.patch('/:id/status', userController.changeUserStatus);

/**
 * DELETE /api/users/:id
 * Eliminar usuario
 */
router.delete('/:id', userController.deleteUser);

export default router;
