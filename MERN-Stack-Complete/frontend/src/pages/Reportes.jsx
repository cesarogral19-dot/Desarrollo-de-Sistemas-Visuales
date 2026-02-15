/**
 * Página Reportes
 * Reportes y estadísticas con exportación PDF
 * (PLANTILLA - Implementar según necesidades)
 */

import React, { useEffect, useState } from 'react';
import { reportAPI } from '../services/api';
import Loading from '../components/Loading';
import '../styles/reportes.css';

const Reportes = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const { data } = await reportAPI.getStatistics();
      setStats(data.data);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      const { data } = await reportAPI.exportPDF(dateRange);
      // Crear descarga
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error exportando PDF:', error);
    }
  };

  if (loading) {
    return <Loading message="Cargando reportes..." />;
  }

  return (
    <div className="reportes-page">
      <div className="container">
        <h1>Reportes y Estadísticas</h1>

        {/* Filtros y exportación */}
        <div className="card report-filters">
          <div className="form-row">
            <div className="form-group">
              <label>Desde</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, startDate: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Hasta</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, endDate: e.target.value })
                }
              />
            </div>

            <button className="btn btn-secondary" onClick={handleExportPDF}>
              📥 Exportar PDF
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        {stats && (
          <>
            {/* Cards principales */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Solicitudes</h3>
                <p className="stat-number">{stats.totalSolicitudes}</p>
              </div>

              <div className="stat-card">
                <h3>Usuarios Activos</h3>
                <p className="stat-number">{stats.totalUsuarios}</p>
              </div>

              <div className="stat-card">
                <h3>Presupuesto Promedio</h3>
                <p className="stat-number">${stats.averageBudget?.toFixed(2)}</p>
              </div>
            </div>

            {/* Gráficos (Plantilla) */}
            <div className="grid-2">
              {/* Estado */}
              <div className="card">
                <h2>Por Estado</h2>
                <div className="status-list">
                  {Object.entries(stats.statusStats || {}).map(
                    ([status, count]) => (
                      <div key={status} className="status-item">
                        <span>{status}</span>
                        <div className="progress-bar">
                          <div
                            className={`progress ${status}`}
                            style={{
                              width: `${(count / stats.totalSolicitudes) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="count">{count}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Prioridad */}
              <div className="card">
                <h2>Por Prioridad</h2>
                <div className="priority-list">
                  {Object.entries(stats.priorityStats || {}).map(
                    ([priority, count]) => (
                      <div key={priority} className="priority-item">
                        <span className={`badge badge-${priority}`}>
                          {priority}
                        </span>
                        <span className="count">{count}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Tipos */}
            <div className="card">
              <h2>Por Tipo</h2>
              <div className="type-grid">
                {Object.entries(stats.typeStats || {}).map(([type, count]) => (
                  <div key={type} className="type-card">
                    <p className="type-name">{type}</p>
                    <p className="type-count">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reportes;
