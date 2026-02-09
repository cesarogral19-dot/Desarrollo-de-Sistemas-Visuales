import { useState } from 'react'

function FormularioNotas({ onAgregarNota }) {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (titulo.trim() && contenido.trim()) {
      onAgregarNota(titulo, contenido)
      setTitulo('')
      setContenido('')
    } else {
      alert('Por favor completa todos los campos')
    }
  }

  return (
    <form className="formulario" onSubmit={manejarSubmit}>
      <h2> Crear Nueva Nota</h2>
      <div className="form-group">
        <label htmlFor="titulo">Título:</label>
        <input
          id="titulo"
          type="text"
          placeholder="Ingresa el título de tu nota"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          placeholder="Ingresa el contenido de tu nota"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
          rows="5"
        ></textarea>
      </div>
      <button type="submit" className="btn-guardar"> Guardar Nota</button>
    </form>
  )
}

export default FormularioNotas
