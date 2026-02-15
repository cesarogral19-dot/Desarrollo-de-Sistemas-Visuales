/**
 * Controlador de Solicitudes
 * CRUD de solicitudes/tickets/compras
 */

import Solicitud from '../models/Solicitud.js';
import User from '../models/User.js';
import { asyncHandler } from '../middlewares/validation.js';
import { REQUEST_STATUS, PAGINATION } from '../config/constants.js';

/**
 * Crear nueva solicitud
 * POST /api/solicitudes
 */
export const createSolicitud = asyncHandler(async (req, res) => {
  const { title, description, type, priority, budget, estimatedDate } = req.body;

  // Obtener datos del usuario
  const user = await User.findById(req.userId);

  const solicitud = new Solicitud({
    title,
    description,
    type,
    priority,
    budget,
    estimatedDate,
    createdBy: req.userId,
    createdByName: user.fullName,
    createdByEmail: user.email,
  });

  await solicitud.save();

  // Poblar referencias
  await solicitud.populate('createdBy', 'firstName lastName email');

  res.status(201).json({
    success: true,
    message: 'Solicitud creada exitosamente',
    data: solicitud,
  });
});

/**
 * Obtener todas las solicitudes con filtros y paginación
 * GET /api/solicitudes
 */
export const getSolicitudes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || PAGINATION.DEFAULT_PAGE;
  const limit = Math.min(
    parseInt(req.query.limit) || PAGINATION.DEFAULT_LIMIT,
    PAGINATION.MAX_LIMIT
  );
  const skip = (page - 1) * limit;

  // Construir filtros
  const filter = {};

  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.type) filter.type = req.query.type;

  // Si es usuario normal, solo ver sus solicitudes
  if (req.userRole === 'USER') {
    filter.createdBy = req.userId;
  }

  // Contar total
  const total = await Solicitud.countDocuments(filter);

  // Obtener solicitudes
  const solicitudes = await Solicitud.find(filter)
    .populate('createdBy', 'firstName lastName email')
    .populate('assignedTo', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    data: solicitudes,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Obtener una solicitud por ID
 * GET /api/solicitudes/:id
 */
export const getSolicitudById = asyncHandler(async (req, res) => {
  const solicitud = await Solicitud.findById(req.params.id)
    .populate('createdBy', 'firstName lastName email')
    .populate('assignedTo', 'firstName lastName email');

  if (!solicitud) {
    return res.status(404).json({
      success: false,
      message: 'Solicitud no encontrada',
    });
  }

  // Verificar permisos
  const esCreador = solicitud.createdBy._id.toString() === req.userId;
  const esAsignado = solicitud.assignedTo?._id.toString() === req.userId;
  const esAdmin = req.userRole === 'ADMIN';

  if (!esCreador && !esAsignado && !esAdmin) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para ver esta solicitud',
    });
  }

  res.json({
    success: true,
    data: solicitud,
  });
});

/**
 * Actualizar solicitud
 * PUT /api/solicitudes/:id
 */
export const updateSolicitud = asyncHandler(async (req, res) => {
  const solicitud = await Solicitud.findById(req.params.id);

  if (!solicitud) {
    return res.status(404).json({
      success: false,
      message: 'Solicitud no encontrada',
    });
  }

  // Verificar permisos - solo el creador o admin pueden editar
  if (
    solicitud.createdBy.toString() !== req.userId &&
    req.userRole !== 'ADMIN'
  ) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para editar esta solicitud',
    });
  }

  // Actualizar campos permitidos
  const { title, description, priority, budget, estimatedDate } = req.body;

  if (title) solicitud.title = title;
  if (description) solicitud.description = description;
  if (priority) solicitud.priority = priority;
  if (budget !== undefined) solicitud.budget = budget;
  if (estimatedDate) solicitud.estimatedDate = estimatedDate;

  await solicitud.save();
  await solicitud.populate('createdBy assignedTo', 'firstName lastName email');

  res.json({
    success: true,
    message: 'Solicitud actualizada exitosamente',
    data: solicitud,
  });
});

/**
 * Cambiar estado de solicitud
 * PATCH /api/solicitudes/:id/status
 */
export const updateSolicitudStatus = asyncHandler(async (req, res) => {
  const { status, rejectionReason } = req.body;

  const solicitud = await Solicitud.findById(req.params.id);

  if (!solicitud) {
    return res.status(404).json({
      success: false,
      message: 'Solicitud no encontrada',
    });
  }

  // Verificar permisos
  if (req.userRole === 'USER') {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para cambiar el estado',
    });
  }

  await solicitud.updateStatus(status, rejectionReason);
  await solicitud.populate('createdBy assignedTo', 'firstName lastName email');

  res.json({
    success: true,
    message: 'Estado actualizado exitosamente',
    data: solicitud,
  });
});

/**
 * Asignar solicitud a un usuario
 * PATCH /api/solicitudes/:id/assign
 */
export const assignSolicitud = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const solicitud = await Solicitud.findById(req.params.id);

  if (!solicitud) {
    return res.status(404).json({
      success: false,
      message: 'Solicitud no encontrada',
    });
  }

  // Verificar permisos
  if (!['ADMIN', 'MANAGER', 'SUPPORT'].includes(req.userRole)) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para asignar',
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  await solicitud.assignTo(userId, user.fullName);
  await solicitud.populate('createdBy assignedTo', 'firstName lastName email');

  res.json({
    success: true,
    message: 'Solicitud asignada exitosamente',
    data: solicitud,
  });
});

/**
 * Añadir comentario
 * POST /api/solicitudes/:id/comments
 */
export const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const solicitud = await Solicitud.findById(req.params.id);

  if (!solicitud) {
    return res.status(404).json({
      success: false,
      message: 'Solicitud no encontrada',
    });
  }

  const user = await User.findById(req.userId);

  await solicitud.addComment(req.userId, user.fullName, comment);
  await solicitud.populate('createdBy assignedTo', 'firstName lastName email');

  res.json({
    success: true,
    message: 'Comentario añadido exitosamente',
    data: solicitud,
  });
});

/**
 * Eliminar solicitud
 * DELETE /api/solicitudes/:id
 */
export const deleteSolicitud = asyncHandler(async (req, res) => {
  const solicitud = await Solicitud.findById(req.params.id);

  if (!solicitud) {
    return res.status(404).json({
      success: false,
      message: 'Solicitud no encontrada',
    });
  }

  // Verificar permisos
  if (
    solicitud.createdBy.toString() !== req.userId &&
    req.userRole !== 'ADMIN'
  ) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para eliminar esta solicitud',
    });
  }

  await Solicitud.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Solicitud eliminada exitosamente',
  });
});

export default {
  createSolicitud,
  getSolicitudes,
  getSolicitudById,
  updateSolicitud,
  updateSolicitudStatus,
  assignSolicitud,
  addComment,
  deleteSolicitud,
};
