/**
 * Controlador de Reportes
 * Generación de reportes y exportación PDF
 */

import Solicitud from '../models/Solicitud.js';
import User from '../models/User.js';
import { asyncHandler } from '../middlewares/validation.js';
import PDFDocument from 'pdfkit';

/**
 * Obtener estadísticas de solicitudes
 * GET /api/reports/stats
 */
export const getStatistics = asyncHandler(async (req, res) => {
  // Total de solicitudes por estado
  const statusStats = await Solicitud.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  // Total de solicitudes por prioridad
  const priorityStats = await Solicitud.aggregate([
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 },
      },
    },
  ]);

  // Total de solicitudes por tipo
  const typeStats = await Solicitud.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    },
  ]);

  // Estadísticas de usuarios
  const userStats = await User.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
      },
    },
  ]);

  // Total general
  const totalSolicitudes = await Solicitud.countDocuments();
  const totalUsuarios = await User.countDocuments();
  const averageBudget = await Solicitud.aggregate([
    {
      $group: {
        _id: null,
        avg: { $avg: '$budget' },
      },
    },
  ]);

  res.json({
    success: true,
    data: {
      totalSolicitudes,
      totalUsuarios,
      averageBudget: averageBudget[0]?.avg || 0,
      statusStats: statusStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      priorityStats: priorityStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      typeStats: typeStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      userStats: userStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
    },
  });
});

/**
 * Generar reporte detallado
 * GET /api/reports/detailed
 */
export const getDetailedReport = asyncHandler(async (req, res) => {
  const { startDate, endDate, status, priority, type } = req.query;

  const filter = {};

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (type) filter.type = type;

  const solicitudes = await Solicitud.find(filter)
    .populate('createdBy', 'firstName lastName email')
    .populate('assignedTo', 'firstName lastName email')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: solicitudes,
  });
});

/**
 * Exportar reporte a PDF
 * GET /api/reports/export-pdf
 */
export const exportReportPDF = asyncHandler(async (req, res) => {
  const { startDate, endDate, status } = req.query;

  const filter = {};

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  if (status) filter.status = status;

  const solicitudes = await Solicitud.find(filter)
    .populate('createdBy', 'firstName lastName email')
    .populate('assignedTo', 'firstName lastName email');

  // Crear PDF
  const doc = new PDFDocument();

  // Headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="reporte-${Date.now()}.pdf"`
  );

  doc.pipe(res);

  // Título
  doc.fontSize(20).text('Reporte de Solicitudes', { align: 'center' });
  doc.moveDown();

  // Información del reporte
  doc.fontSize(12);
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`);
  doc.text(`Total de solicitudes: ${solicitudes.length}`);
  doc.moveDown();

  // Tabla
  doc.fontSize(10);

  const columns = ['Título', 'Estado', 'Prioridad', 'Solicitante'];
  const columnWidths = [150, 80, 80, 120];
  let y = doc.y;
  const rowHeight = 20;

  // Headers de tabla
  doc.fillColor('#cccccc');
  doc.rect(50, y, 430, rowHeight).fill();
  doc.fillColor('#000000');

  let x = 50;
  columns.forEach((col, idx) => {
    doc.text(col, x, y + 5, { width: columnWidths[idx] });
    x += columnWidths[idx];
  });

  y += rowHeight;

  // Filas
  solicitudes.forEach((sol) => {
    doc.text(sol.title, 50, y, { width: columnWidths[0] });
    doc.text(sol.status, 200, y, { width: columnWidths[1] });
    doc.text(sol.priority, 280, y, { width: columnWidths[2] });
    doc.text(sol.createdByName, 360, y, { width: columnWidths[3] });

    y += rowHeight;

    if (y > 750) {
      doc.addPage();
      y = 50;
    }
  });

  doc.end();
});

/**
 * Resumen por usuario
 * GET /api/reports/user-summary
 */
export const getUserSummary = asyncHandler(async (req, res) => {
  const userSummary = await Solicitud.aggregate([
    {
      $group: {
        _id: '$createdBy',
        total: { $sum: 1 },
        approved: {
          $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
        },
        rejected: {
          $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] },
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
  ]);

  res.json({
    success: true,
    data: userSummary,
  });
});

export default {
  getStatistics,
  getDetailedReport,
  exportReportPDF,
  getUserSummary,
};
