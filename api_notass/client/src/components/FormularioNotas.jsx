import { useState } from 'react'

function FormularioNotas({ onAgregarNota }) {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [error, setError] = useState('')

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (titulo.trim() && contenido.trim()) {
      onAgregarNota(titulo, contenido)
      setTitulo('')
      setContenido('')
      setError('')
    } else {
      setError('Por favor completa todos los campos')
    }
  }

  return (
    <form className="formulario panel" onSubmit={manejarSubmit}>
      <h2>✨ Crear Nueva Nota</h2>
      
      <div className="form-group">
        <label htmlFor="titulo">Título:</label>
        <input
          id="titulo"
          type="text"
          placeholder="Ingresa el título de tu nota"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="form-group panel-separacion">
        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          placeholder="Ingresa el contenido de tu nota"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows="5"
        ></textarea>
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" className="btn-guardar">💾 Guardar Nota</button>
    </form>
  )
}

export default FormularioNotas
