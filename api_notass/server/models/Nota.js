let notas = [
  { id: 1, titulo: 'Bienvenido', contenido: 'Esta es tu primera nota', fecha: new Date() },
  { id: 2, titulo: 'Segunda nota', contenido: 'Puedes agregar más notas', fecha: new Date() }
];

class Nota {
  static obtenerTodas() {
    return notas;
  }

  static obtenerPorId(id) {
    return notas.find(nota => nota.id === parseInt(id));
  }

  static crear(titulo, contenido) {
    const nuevaNota = {
      id: notas.length > 0 ? Math.max(...notas.map(n => n.id)) + 1 : 1,
      titulo,
      contenido,
      fecha: new Date()
    };
    notas.push(nuevaNota);
    console.log(` Nota creada: "${titulo}"`);
    return nuevaNota;
  }

  static eliminar(id) {
    const index = notas.findIndex(nota => nota.id === parseInt(id));
    if (index !== -1) {
      const notaEliminada = notas.splice(index, 1);
      console.log(` Nota eliminada con ID: ${id}`);
      return notaEliminada;
    }
    return null;
  }
}

module.exports = Nota;
