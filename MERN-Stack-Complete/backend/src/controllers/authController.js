/**
 * Controlador de Autenticación
 * Maneja login, register y operaciones relacionadas
 */

import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from '../middlewares/validation.js';

/**
 * Genera JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

/**
 * Registra un nuevo usuario
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validaciones básicas
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Las contraseñas no coinciden',
    });
  }

  // Verificar si usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'El email ya está registrado',
    });
  }

  // Crear usuario
  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  // Generar token
  const token = generateToken(user);

  // Optional: Guardar en cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  });

  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente',
    token,
    user: user.toJSON(),
  });
});

/**
 * Login de usuario
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  // Buscar usuario y incluir password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email o contraseña incorrectos',
    });
  }

  // Verificar si usuario está bloqueado
  if (user.isLocked) {
    return res.status(403).json({
      success: false,
      message: 'La cuenta está bloqueada. Intenta más tarde',
    });
  }

  // Verificar contraseña
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    await user.incLoginAttempts();
    return res.status(401).json({
      success: false,
      message: 'Email o contraseña incorrectos',
    });
  }

  // Reset intentos y actualizar último login
  await user.resetLoginAttempts();

  // Generar token
  const token = generateToken(user);

  // Guardar en cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: 'Login exitoso',
    token,
    user: user.toJSON(),
  });
});

/**
 * Logout
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Sesión cerrada exitosamente',
  });
});

/**
 * Obtiene el usuario actual
 * GET /api/auth/me
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  res.json({
    success: true,
    user: user.toJSON(),
  });
});

/**
 * Actualiza el perfil del usuario
 * PUT /api/auth/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, department } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    { firstName, lastName, phone, department },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Perfil actualizado exitosamente',
    user: user.toJSON(),
  });
});

/**
 * Cambia la contraseña
 * POST /api/auth/change-password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Las nuevas contraseñas no coinciden',
    });
  }

  const user = await User.findById(req.userId).select('+password');

  // Verificar contraseña actual
  const isValid = await user.comparePassword(currentPassword);
  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: 'Contraseña actual incorrecta',
    });
  }

  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Contraseña actualizada exitosamente',
  });
});

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword,
};
