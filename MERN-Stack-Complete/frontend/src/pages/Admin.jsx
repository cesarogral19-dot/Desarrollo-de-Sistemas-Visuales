/**
 * Página Admin
 * Panel de administración
 * (PLANTILLA - Implementar según necesidades)
 */

import React, { useEffect, useState } from 'react';
import { userAPI } from '../services/api';
import Loading from '../components/Loading';
import '../styles/admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await userAPI.getAll();
      setUsers(data.data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await userAPI.delete(userId);
        await loadUsers();
      } catch (error) {
        console.error('Error eliminando usuario:', error);
      }
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await userAPI.changeRole(userId, { role: newRole });
      await loadUsers();
    } catch (error) {
      console.error('Error cambiando rol:', error);
    }
  };

  if (loading) {
    return <Loading message="Cargando panel de admin..." />;
  }

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Panel de Administrador</h1>

        {/* Gestión de usuarios */}
        <div className="admin-section">
          <h2>Gestión de Usuarios</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user._id, e.target.value)}
                      className="role-select"
                    >
                      <option value="USER">USER</option>
                      <option value="SUPPORT">SUPPORT</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td>
                    <span
                      className={`status-badge status-${user.status}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
