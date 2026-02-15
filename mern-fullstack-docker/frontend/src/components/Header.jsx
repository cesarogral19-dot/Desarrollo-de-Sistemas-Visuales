import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()
  return (
    <header className="header">
      <div className="logo">
        <img src="/src/assets/logo.svg" width="36" alt="logo" />
        <span>MERN-Stack</span>
      </div>
      <nav className="nav">
        {user ? (
          <>
            <button onClick={() => nav('/dashboard')}>Dashboard</button>
            <button onClick={() => nav('/request/new')}>Nueva solicitud</button>
            <button onClick={() => nav('/reports')}>Reportes</button>
            {(user.role === 'MANAGER' || user.role === 'ADMIN') && <button onClick={() => nav('/manager')}>Manager</button>}
            {user.role === 'SUPPORT' && <button onClick={() => nav('/support')}>Support</button>}
            {user.role === 'ADMIN' && <button onClick={() => nav('/admin')}>Admin</button>}
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </nav>
    </header>
  )
}
