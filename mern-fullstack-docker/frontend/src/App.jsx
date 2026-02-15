import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />

      <Route
        path="*"
        element={
          <div style={{
            color: 'white',
            background: 'red',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h1>⚠️ RUTA NO ENCONTRADA</h1>
            <p>Intentaste entrar a: {window.location.pathname}</p>
            <a href="/login" style={{ color: 'yellow' }}>
              Volver al Inicio
            </a>
          </div>
        }
      />
    </Routes>
  );
}
