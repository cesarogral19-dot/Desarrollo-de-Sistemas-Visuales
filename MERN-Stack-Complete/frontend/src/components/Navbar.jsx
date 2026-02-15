/**
 * Componente de Navbar
 * Barra de navegación principal
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📊</span>
          MERN App
        </Link>

        {/* Toggle mobile */}
        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Menu */}
        <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/solicitudes" className="nav-link">
                Solicitudes
              </Link>

              {user?.role === 'ADMIN' && (
                <>
                  <Link to="/usuarios" className="nav-link">
                    Usuarios
                  </Link>
                  <Link to="/admin" className="nav-link">
                    Admin
                  </Link>
                </>
              )}

              {['ADMIN', 'MANAGER', 'SUPPORT'].includes(user?.role) && (
                <Link to="/reportes" className="nav-link">
                  Reportes
                </Link>
              )}

              <div className="nav-user">
                <span>👤 {user?.firstName}</span>
                <button className="btn btn-primary btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
