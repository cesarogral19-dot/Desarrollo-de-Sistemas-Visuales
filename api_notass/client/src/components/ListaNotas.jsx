function ListaNotas({ notas }) {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="lista-notas panel">
      <h2>📚 Mis Notas ({notas.length})</h2>
      
      {notas.length === 0 ? (
        <div className="sin-notas">
          <p>📭</p>
          <p>No hay notas aún. ¡Crea tu primera nota!</p>
        </div>
      ) : (
        <ul>
          {notas.map((nota) => (
            <li key={nota.id} className="tarjeta-nota">
              <div className="nota-header">
                <h3>{nota.titulo}</h3>
                <span className="nota-id">#{nota.id}</span>
              </div>
              <p className="nota-contenido">{nota.contenido}</p>
              <small className="nota-fecha">📅 {formatearFecha(nota.fecha)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaNotas
