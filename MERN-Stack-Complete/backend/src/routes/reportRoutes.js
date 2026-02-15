/**
 * Rutas de Reportes
 */

import express from 'express';
import * as reportController from '../controllers/reportController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Aplicar autenticación a todas las rutas
router.use(authenticate);

/**
 * GET /api/reports/stats
 * Obtener estadísticas
 */
router.get('/stats', reportController.getStatistics);

/**
 * GET /api/reports/detailed
 * Obtener reporte detallado
 */
router.get('/detailed', reportController.getDetailedReport);

/**
 * GET /api/reports/user-summary
 * Obtener resumen por usuario
 */
router.get('/user-summary', reportController.getUserSummary);

/**
 * GET /api/reports/export-pdf
 * Exportar a PDF
 */
router.get('/export-pdf', reportController.exportReportPDF);

export default router;
