/**
 * Constantes de la Aplicación
 */

// Roles disponibles
export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
  SUPPORT: 'SUPPORT',
};

// Estados de solicitud
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Prioridades
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// Tipos de solicitud
export const REQUEST_TYPES = {
  PURCHASE: 'purchase',
  SUPPORT: 'support',
  INFORMATION: 'information',
};

// Límites y paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Códigos de error
export const ERROR_CODES = {
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

export default {
  ROLES,
  REQUEST_STATUS,
  PRIORITY,
  REQUEST_TYPES,
  PAGINATION,
  ERROR_CODES,
};
