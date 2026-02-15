import api from './api'

export const listUsers = () => api.get('/users')
export const updateUser = (id, payload) => api.put(`/users/${id}`, payload)
