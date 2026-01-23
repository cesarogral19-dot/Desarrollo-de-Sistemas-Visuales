// ===============================
// Estado (modelo mínimo en memoria)
// ===============================
let reactivos = [];
let idEditando = null;

// ===============================
// Referencias al DOM
// ===============================
const form = document.getElementById('formularioReactivo');
const preguntaInput = document.getElementById('textoPregunta');
const respuestaInput = document.getElementById('textoRespuesta');
const lista = document.getElementById('listaReactivos');
const error = document.getElementById('textoError');
const mensaje = document.getElementById('mensaje');
const btnGuardar = document.getElementById('btnGuardar');
const textoVacio = document.getElementById('textoVacio');

// ===============================
// Validación en tiempo real
// ===============================
function validarFormulario() {
  if (preguntaInput.value.trim().length < 10) {
    error.textContent = 'La pregunta debe tener al menos 10 caracteres';
    btnGuardar.disabled = true;
    return false;
  }

  if (!respuestaInput.value.trim()) {
    error.textContent = 'La respuesta es obligatoria';
    btnGuardar.disabled = true;
    return false;
  }

  error.textContent = '';
  btnGuardar.disabled = false;
  return true;
}

preguntaInput.addEventListener('input', validarFormulario);
respuestaInput.addEventListener('input', validarFormulario);

// ===============================
// CREATE / UPDATE
// ===============================
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validarFormulario()) return;

  const pregunta = preguntaInput.value.trim();
  const respuesta = respuestaInput.value.trim();

  if (idEditando) {
    // UPDATE
    const reactivo = reactivos.find(r => r.id === idEditando);
    reactivo.pregunta = pregunta;
    reactivo.respuesta = respuesta;
    mensaje.textContent = 'Reactivo actualizado correctamente.';
    idEditando = null;
  } else {
    // CREATE
    reactivos.push({
      id: Date.now(),
      pregunta,
      respuesta
    });
    mensaje.textContent = 'Reactivo creado correctamente.';
  }

  form.reset();
  btnGuardar.disabled = true;
  render();
});

// ===============================
// READ (render dinámico)
// ===============================
function render() {
  lista.innerHTML = '';

  if (reactivos.length === 0) {
    textoVacio.style.display = 'block';
    return;
  }

  textoVacio.style.display = 'none';

  reactivos.forEach(r => {
    const li = document.createElement('li');
    li.dataset.id = r.id;
    li.innerHTML = `
      <strong>${r.pregunta}</strong>
      <p class="texto-chico">Respuesta: ${r.respuesta}</p>
      <button data-accion="editar">Editar</button>
      <button data-accion="eliminar">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// ===============================
// UPDATE / DELETE (delegación)
// ===============================
lista.addEventListener('click', e => {
  const accion = e.target.dataset.accion;
  if (!accion) return;

  const li = e.target.closest('li');
  const id = Number(li.dataset.id);
  const reactivo = reactivos.find(r => r.id === id);

  if (accion === 'editar') {
    preguntaInput.value = reactivo.pregunta;
    respuestaInput.value = reactivo.respuesta;
    idEditando = id;
    mensaje.textContent = 'Editando reactivo...';
    validarFormulario();
  }

  if (accion === 'eliminar') {
    reactivos = reactivos.filter(r => r.id !== id);
    mensaje.textContent = 'Reactivo eliminado.';
    render();
  }
});
