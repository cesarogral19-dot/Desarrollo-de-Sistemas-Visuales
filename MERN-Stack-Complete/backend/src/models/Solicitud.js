/**
 * Modelo de Solicitud
 * Contiene la estructura de solicitudes/tickets/compras
 */

import mongoose from 'mongoose';
import { REQUEST_STATUS, PRIORITY, REQUEST_TYPES } from '../config/constants.js';

const solicitudSchema = new mongoose.Schema(
  {
    // Información de la solicitud
    title: {
      type: String,
      required: [true, 'El título es requerido'],
      trim: true,
      minlength: [5, 'El título debe tener al menos 5 caracteres'],
      maxlength: [200, 'El título no puede exceder 200 caracteres'],
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    },
    type: {
      type: String,
      enum: [REQUEST_TYPES.PURCHASE, REQUEST_TYPES.SUPPORT, REQUEST_TYPES.INFORMATION],
      default: REQUEST_TYPES.SUPPORT,
    },
    status: {
      type: String,
      enum: [
        REQUEST_STATUS.PENDING,
        REQUEST_STATUS.APPROVED,
        REQUEST_STATUS.REJECTED,
        REQUEST_STATUS.COMPLETED,
        REQUEST_STATUS.CANCELLED,
      ],
      default: REQUEST_STATUS.PENDING,
    },
    priority: {
      type: String,
      enum: [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH, PRIORITY.URGENT],
      default: PRIORITY.MEDIUM,
    },

    // Información del solicitante
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdByName: {
      type: String,
      required: true,
    },
    createdByEmail: {
      type: String,
      required: true,
    },

    // Información de asignación
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    assignedToName: {
      type: String,
      default: null,
    },

    // Información adicional para compras
    budget: {
      type: Number,
      default: 0,
    },
    estimatedDate: {
      type: Date,
      default: null,
    },

    // Comentarios y actualizaciones
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        userName: String,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Auditoría
    attachments: [String], // URLs de archivos adjuntos
    rejectionReason: {
      type: String,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ==================
// ÍNDICES
// ==================
solicitudSchema.index({ createdBy: 1, createdAt: -1 });
solicitudSchema.index({ assignedTo: 1, status: 1 });
solicitudSchema.index({ status: 1, priority: -1 });

// ==================
// MÉTODOS
// ==================

/**
 * Actualiza el estado de la solicitud
 * @param {string} nuevoEstado
 * @param {string} razon - Razón de rechazo (opcional)
 */
solicitudSchema.methods.updateStatus = async function (nuevoEstado, razon = null) {
  this.status = nuevoEstado;

  if (nuevoEstado === REQUEST_STATUS.COMPLETED) {
    this.completedAt = new Date();
  }

  if (nuevoEstado === REQUEST_STATUS.REJECTED) {
    this.rejectionReason = razon;
  }

  return this.save();
};

/**
 * Añade un comentario a la solicitud
 */
solicitudSchema.methods.addComment = async function (userId, userName, comment) {
  this.comments.push({
    userId,
    userName,
    comment,
  });
  return this.save();
};

/**
 * Asigna la solicitud a un usuario
 */
solicitudSchema.methods.assignTo = async function (userId, userName) {
  this.assignedTo = userId;
  this.assignedToName = userName;
  return this.save();
};

const Solicitud = mongoose.model('Solicitud', solicitudSchema);
export default Solicitud;
