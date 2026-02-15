/**
 * Controlador de Usuarios
 * Gestión de usuarios (admin)
 */

import User from '../models/User.js';
import { asyncHandler } from '../middlewares/validation.js';
import { PAGINATION } from '../config/constants.js';

/**
 * Obtener todos los usuarios
 * GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || PAGINATION.DEFAULT_PAGE;
  const limit = Math.min(
    parseInt(req.query.limit) || PAGINATION.DEFAULT_LIMIT,
    PAGINATION.MAX_LIMIT
  );
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.role) filter.role = req.query.role;

  const total = await User.countDocuments(filter);

  const users = await User.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    data: users.map((user) => user.toJSON()),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Obtener usuario por ID
 * GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  res.json({
    success: true,
    data: user.toJSON(),
  });
});

/**
 * Actualizar usuario (admin)
 * PUT /api/users/:id
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, department, role, status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstName,
      lastName,
      email,
      phone,
      department,
      role,
      status,
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  res.json({
    success: true,
    message: 'Usuario actualizado exitosamente',
    data: user.toJSON(),
  });
});

/**
 * Cambiar role del usuario
 * PATCH /api/users/:id/role
 */
export const changeUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  const validRoles = ['ADMIN', 'MANAGER', 'USER', 'SUPPORT'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Role inválido',
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  res.json({
    success: true,
    message: 'Role actualizado exitosamente',
    data: user.toJSON(),
  });
});

/**
 * Cambiar estado del usuario
 * PATCH /api/users/:id/status
 */
export const changeUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const validStatuses = ['active', 'inactive', 'suspended'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Estado inválido',
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  res.json({
    success: true,
    message: 'Estado actualizado exitosamente',
    data: user.toJSON(),
  });
});

/**
 * Eliminar usuario
 * DELETE /api/users/:id
 */
export const deleteUser = asyncHandler(async (req, res) => {
  // Prevenir eliminar el último admin
  const adminCount = await User.countDocuments({ role: 'ADMIN' });

  if (adminCount <= 1) {
    const user = await User.findById(req.params.id);
    if (user.role === 'ADMIN') {
      return res.status(400).json({
        success: false,
        message: 'No puedes eliminar el último admin',
      });
    }
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  res.json({
    success: true,
    message: 'Usuario eliminado exitosamente',
  });
});

export default {
  getAllUsers,
  getUserById,
  updateUser,
  changeUserRole,
  changeUserStatus,
  deleteUser,
};
