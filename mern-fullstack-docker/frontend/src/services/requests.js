import api from './api'

export const createRequest = (payload) => api.post('/requests', payload)
export const getRequests = () => api.get('/requests')
export const updateRequest = (id, payload) => api.put(`/requests/${id}`, payload)
export const deleteRequest = (id) => api.delete(`/requests/${id}`)
export const exportPDF = () => api.get('/pdf/export', { responseType: 'arraybuffer' })
export const approveRequest = (id, payload = {}) => api.patch(`/requests/${id}/approve`, payload)
