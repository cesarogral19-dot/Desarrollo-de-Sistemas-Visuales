/**
 * Página Solicitudes
 * Gestión de solicitudes/tickets/compras
 * (PLANTILLA - Implementar según necesidades)
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { solicitudAPI } from '../services/api';
import Loading from '../components/Loading';
import { useForm } from '../hooks/useForm';
import '../styles/solicitudes.css';

const Solicitudes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
  });

  const validateForm = (values) => {
    const errors = {};
    if (!values.title || values.title.length < 5) {
      errors.title = 'El título debe tener al menos 5 caracteres';
    }
    if (!values.description || values.description.length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    { title: '', description: '', type: 'support', priority: 'medium' },
    validateForm
  );

  // Cargar solicitudes
  useEffect(() => {
    loadSolicitudes();
  }, [filters]);

  const loadSolicitudes = async () => {
    try {
      setLoading(true);
      const { data } = await solicitudAPI.getAll(filters);
      setSolicitudes(data.data);
    } catch (error) {
      console.error('Error cargando solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formValues) => {
    try {
      await solicitudAPI.create(formValues);
      reset();
      setShowForm(false);
      await loadSolicitudes();
    } catch (error) {
      console.error('Error creando solicitud:', error);
    }
  };

  if (loading && !solicitudes.length) {
    return <Loading message="Cargando solicitudes..." />;
  }

  return (
    <div className="solicitudes-page">
      <div className="container">
        <div className="page-header">
          <h1>Solicitudes</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : '+ Nueva Solicitud'}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="card form-card">
            <h2>Crear Nueva Solicitud</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Título de la solicitud"
                />
                {errors.title && <span className="error">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Describe tu solicitud en detalle..."
                ></textarea>
                {errors.description && (
                  <span className="error">{errors.description}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select name="type" value={values.type} onChange={handleChange}>
                    <option value="support">Soporte</option>
                    <option value="purchase">Compra</option>
                    <option value="information">Información</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Prioridad</label>
                  <select
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Crear Solicitud
              </button>
            </form>
          </div>
        )}

        {/* Filtros */}
        <div className="filters-card">
          <div className="form-row">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobada</option>
              <option value="rejected">Rechazada</option>
              <option value="completed">Completada</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">Todas las prioridades</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>

        {/* Tabla de solicitudes */}
        {solicitudes.length > 0 ? (
          <div className="solicitudes-grid">
            {solicitudes.map((sol) => (
              <div key={sol._id} className="solicitud-card">
                <div className="card-header">
                  <h3>{sol.title}</h3>
                  <span className={`badge badge-${sol.status}`}>
                    {sol.status}
                  </span>
                </div>
                <p>{sol.description.substring(0, 100)}...</p>
                <div className="card-footer">
                  <span className={`badge badge-${sol.priority}`}>
                    {sol.priority}
                  </span>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => navigate(`/solicitudes/${sol._id}`)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center mt-lg">No hay solicitudes</p>
        )}
      </div>
    </div>
  );
};

export default Solicitudes;
