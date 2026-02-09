import { useState, useEffect } from 'react'
import FormularioNotas from './components/FormularioNotas'
import ListaNotas from './components/ListaNotas'
import './App.css'

function App() {
  const [notas, setNotas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cargarNotas = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://localhost:5000/api/notas')
      const data = await response.json()
      if (data.success) {
        setNotas(data.data)
      }
    } catch (err) {
      setError('Error al cargar notas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const agregarNota = async (titulo, contenido) => {
    try {
      const response = await fetch('http://localhost:5000/api/notas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, contenido })
      })
      const data = await response.json()
      if (data.success) {
        cargarNotas()
      } else {
        setError(data.mensaje)
      }
    } catch (err) {
      setError('Error al crear nota')
      console.error(err)
    }
  }

  useEffect(() => {
    cargarNotas()
  }, [])

  return (
    <div className="App">
      <header className="header">
        <h1>📝 Gestor de Notas</h1>
        <p>Crea y gestiona tus notas de forma sencilla</p>
      </header>
      
      {error && <div className="error">{error}</div>}
      
      <FormularioNotas onAgregarNota={agregarNota} />
      
      {loading ? (
        <p className="loading">⏳ Cargando notas...</p>
      ) : (
        <ListaNotas notas={notas} />
      )}
    </div>
  )
}

export default App
