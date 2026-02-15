/**
 * Página Home
 * Página inicial
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh' }}>
      <h1>Bienvenido a MERN Stack Application 🚀</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        Una aplicación completa construida con MongoDB, Express, React y Node.js
      </p>

      {isAuthenticated ? (
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Ir al Dashboard
        </Link>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary btn-lg">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn btn-secondary btn-lg">
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
