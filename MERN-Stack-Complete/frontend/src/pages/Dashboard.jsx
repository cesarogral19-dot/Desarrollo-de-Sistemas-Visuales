/**
 * Página Dashboard
 * Panel principal después del login
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { reportAPI, solicitudAPI } from '../services/api';
import Loading from '../components/Loading';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (['ADMIN', 'MANAGER', 'SUPPORT'].includes(user?.role)) {
          const { data: statsData } = await reportAPI.getStatistics();
          setStats(statsData.data);
        }

        const { data: solicitudesData } = await solicitudAPI.getAll({ limit: 5 });
        setSolicitudes(solicitudesData.data);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.role]);

  if (loading) return <Loading message="Cargando dashboard..." />;

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Bienvenido, {user?.firstName}! 👋</h1>

        {/* Tarjetas de Estadísticas */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>{stats.totalSolicitudes || 0}</h3>
                <p>Total de Solicitudes</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{stats.totalUsuarios || 0}</h3>
                <p>Usuario en Sistema</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{stats.statusStats?.approved || 0}</h3>
                <p>Aprobadas</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>{stats.statusStats?.pending || 0}</h3>
                <p>Pendientes</p>
              </div>
            </div>
          </div>
        )}

        {/* Solicitudes Recientes */}
        <div className="dashboard-section">
          <h2>Solicitudes Recientes</h2>
          {solicitudes.length > 0 ? (
            <div className="solicitudes-table">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Estado</th>
                    <th>Prioridad</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((sol) => (
                    <tr key={sol._id}>
                      <td className="font-semibold">{sol.title}</td>
                      <td>
                        <span className={`badge badge-${sol.status}`}>
                          {sol.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${sol.priority}`}>
                          {sol.priority}
                        </span>
                      </td>
                      <td>
                        {new Date(sol.createdAt).toLocaleDateString('es-ES')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No hay solicitudes recientes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
