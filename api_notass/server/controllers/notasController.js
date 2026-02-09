const crearNota = (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    // ... validaciones ...
    const nuevaNota = Nota.crear(titulo, contenido); // Esto añade la nota al array
    
    // Es vital devolver success: true para que el Frontend de React actualice la lista
    res.status(201).json({
      success: true,
      mensaje: 'Nota creada correctamente',
      data: nuevaNota
    });
  } catch (error) {
    // ... manejo de error ...
  }
};