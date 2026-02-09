function ListaNotas({ notas }) {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="lista-notas">
      <h2> Mis Notas ({notas.length})</h2>
      {notas.length === 0 ? (
        <div className="sin-notas">
          <p> No hay notas aún.</p>
          <p>¡Crea tu primera nota arriba!</p>
        </div>
      ) : (
        <div className="notas-grid">
          {notas.map((nota) => (
            <div key={nota.id} className="tarjeta-nota">
              <div className="nota-header">
                <h3>{nota.titulo}</h3>
                <span className="nota-id">#{nota.id}</span>
              </div>
              <p className="nota-contenido">{nota.contenido}</p>
              <small className="nota-fecha"> {formatearFecha(nota.fecha)}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListaNotas
