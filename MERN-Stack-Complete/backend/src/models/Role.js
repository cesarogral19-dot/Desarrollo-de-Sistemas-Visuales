/**
 * Modelo de Rol
 * Define permisos para cada rol
 */

import mongoose from 'mongoose';
import { ROLES } from '../config/constants.js';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER, ROLES.SUPPORT],
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: {
      // Solicitudes
      canCreateRequest: { type: Boolean, default: true },
      canEditOwnRequest: { type: Boolean, default: true },
      canEditAllRequest: { type: Boolean, default: false },
      canDeleteRequest: { type: Boolean, default: false },
      canApproveRequest: { type: Boolean, default: false },
      canRejectRequest: { type: Boolean, default: false },
      canAssignRequest: { type: Boolean, default: false },

      // Usuarios
      canViewAllUsers: { type: Boolean, default: false },
      canCreateUser: { type: Boolean, default: false },
      canEditUser: { type: Boolean, default: false },
      canDeleteUser: { type: Boolean, default: false },
      canManageRoles: { type: Boolean, default: false },

      // Reportes
      canViewReports: { type: Boolean, default: true },
      canExportReport: { type: Boolean, default: true },
      canGeneratePDF: { type: Boolean, default: true },

      // Sistema
      canAccessAdmin: { type: Boolean, default: false },
      canViewLogs: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model('Role', roleSchema);
export default Role;
