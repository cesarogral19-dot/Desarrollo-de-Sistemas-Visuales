import { useState, useEffect } from 'react'
import ListaNotas from './components/ListaNotas'
import FormularioNotas from './components/FormularioNotas'
import './App.css'

function App() {
  const [notas, setNotas] = useState([])
  const [loading, setLoading] = useState(false)

  const cargarNotas = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/notas')
      const data = await response.json()
      if (data.success) {
        setNotas(data.data)
        console.log(' Notas cargadas:', data.data)
      }
    } catch (error) {
      console.error(' Error al cargar notas:', error)
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
        console.log(' Nota creada:', data.data)
        cargarNotas()
      }
    } catch (error) {
      console.error(' Error al crear nota:', error)
    }
  }

  useEffect(() => {
    cargarNotas()
  }, [])

  return (
    <div className="App">
      <header className="header">
        <h1> Gestor de Notas</h1>
        <p className="subtitle">Crea y gestiona tus notas de forma sencilla</p>
      </header>
      <main className="main">
        <FormularioNotas onAgregarNota={agregarNota} />
        {loading ? (
          <p className="loading"> Cargando notas...</p>
        ) : (
          <ListaNotas notas={notas} />
        )}
      </main>
    </div>
  )
}

export default App
