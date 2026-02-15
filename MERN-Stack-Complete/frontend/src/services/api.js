/**
 * Servicio API - Cliente Axios configurado
 * Maneja todas las llamadas HTTP
 */

import axios from 'axios';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Incluir cookies
});

// Interceptor de solicitud
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si token expiró, limpiar y redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ==================
// AUTENTICACIÓN
// ==================

export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
  changePassword: (data) => apiClient.post('/auth/change-password', data),
};

// ==================
// SOLICITUDES
// ==================

export const solicitudAPI = {
  create: (data) => apiClient.post('/solicitudes', data),
  getAll: (params) => apiClient.get('/solicitudes', { params }),
  getById: (id) => apiClient.get(`/solicitudes/${id}`),
  update: (id, data) => apiClient.put(`/solicitudes/${id}`, data),
  updateStatus: (id, data) => apiClient.patch(`/solicitudes/${id}/status`, data),
  assign: (id, data) => apiClient.patch(`/solicitudes/${id}/assign`, data),
  addComment: (id, data) => apiClient.post(`/solicitudes/${id}/comments`, data),
  delete: (id) => apiClient.delete(`/solicitudes/${id}`),
};

// ==================
// USUARIOS
// ==================

export const userAPI = {
  getAll: (params) => apiClient.get('/users', { params }),
  getById: (id) => apiClient.get(`/users/${id}`),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  changeRole: (id, data) => apiClient.patch(`/users/${id}/role`, data),
  changeStatus: (id, data) => apiClient.patch(`/users/${id}/status`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
};

// ==================
// REPORTES
// ==================

export const reportAPI = {
  getStatistics: () => apiClient.get('/reports/stats'),
  getDetailedReport: (params) => apiClient.get('/reports/detailed', { params }),
  getUserSummary: () => apiClient.get('/reports/user-summary'),
  exportPDF: (params) => 
    apiClient.get('/reports/export-pdf', { 
      params, 
      responseType: 'blob' 
    }),
};

export default apiClient;
