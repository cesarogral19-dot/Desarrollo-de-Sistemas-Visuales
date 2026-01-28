import { useEffect, useState } from 'react'
import './App.css'

type Session = {
  name: string
  email: string
  date: string
}

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  // Al cargar la app, revisa si hay sesión
  useEffect(() => {
    const storedSession = localStorage.getItem('session')
    if (storedSession) {
      setSession(JSON.parse(storedSession))
    }
  }, [])

  const saveSession = () => {
    if (!name || !email) return

    const newSession: Session = {
      name,
      email,
      date: new Date().toLocaleString()
    }

    localStorage.setItem('session', JSON.stringify(newSession))
    setSession(newSession)
  }

  const logout = () => {
    localStorage.removeItem('session')
    setSession(null)
    setName('')
    setEmail('')
  }

  return (
    <div className="app-container">
      {!session ? (
        <>
          <h1>Iniciar Sesión</h1>

          <div className="form">
            <input
              type="text"
              placeholder="👤 Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="📧 Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={saveSession}>Guardar Sesión</button>
          </div>
        </>
      ) : (
        <>
          <h1>Sesión Activa</h1>

          <div className="session-box">
            <p><strong>👤 Nombre:</strong> {session.name}</p>
            <p><strong>📧 Email:</strong> {session.email}</p>
            <p><strong>🕒 Fecha:</strong> {session.date}</p>

            <button className="logout" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
