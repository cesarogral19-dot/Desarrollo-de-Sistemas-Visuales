/**
 * Rutas de Solicitudes
 */

import express from 'express';
import { body } from 'express-validator';
import * as solicitudController from '../controllers/solicitudController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

// Aplicar autenticación a todas las rutas
router.use(authenticate);

/**
 * POST /api/solicitudes
 * Crear nueva solicitud
 */
router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('El título es requerido')
      .isLength({ min: 5 })
      .withMessage('El título debe tener al menos 5 caracteres'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('La descripción es requerida')
      .isLength({ min: 10 })
      .withMessage('La descripción debe tener al menos 10 caracteres'),
    body('type')
      .trim()
      .notEmpty()
      .withMessage('El tipo es requerido'),
    body('priority')
      .trim()
      .notEmpty()
      .withMessage('La prioridad es requerida'),
  ],
  handleValidationErrors,
  solicitudController.createSolicitud
);

/**
 * GET /api/solicitudes
 * Obtener todas las solicitudes
 */
router.get('/', solicitudController.getSolicitudes);

/**
 * GET /api/solicitudes/:id
 * Obtener una solicitud por ID
 */
router.get('/:id', solicitudController.getSolicitudById);

/**
 * PUT /api/solicitudes/:id
 * Actualizar solicitud
 */
router.put('/:id', solicitudController.updateSolicitud);

/**
 * PATCH /api/solicitudes/:id/status
 * Cambiar estado
 */
router.patch(
  '/:id/status',
  authorize('ADMIN', 'MANAGER', 'SUPPORT'),
  solicitudController.updateSolicitudStatus
);

/**
 * PATCH /api/solicitudes/:id/assign
 * Asignar solicitud
 */
router.patch(
  '/:id/assign',
  authorize('ADMIN', 'MANAGER', 'SUPPORT'),
  solicitudController.assignSolicitud
);

/**
 * POST /api/solicitudes/:id/comments
 * Añadir comentario
 */
router.post('/:id/comments', solicitudController.addComment);

/**
 * DELETE /api/solicitudes/:id
 * Eliminar solicitud
 */
router.delete('/:id', solicitudController.deleteSolicitud);

export default router;
