/**
 * Contexto de Autenticación
 * Maneja el estado global de login/usuario
 */

import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar usuario al iniciar (evitar llamar /auth/me si el token local está expirado)
  useEffect(() => {
    const isTokenExpired = (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.exp) return true;
        return Date.now() >= payload.exp * 1000;
      } catch (e) {
        return true;
      }
    };

    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Si el token expiró evitamos la llamada a /auth/me (evita 401 en Network)
          if (isTokenExpired(token)) {
            localStorage.removeItem('token');
            setLoading(false);
            return;
          }

          const { data } = await authAPI.getCurrentUser();
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión',
      };
    }
  };

  const register = async (firstName, lastName, email, password, confirmPassword) => {
    try {
      const { data } = await authAPI.register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrar',
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Error al logout:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      const { data: response } = await authAPI.updateProfile(data);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al actualizar perfil',
      };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
