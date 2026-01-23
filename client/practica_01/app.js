// ===== Estado (modelo mínimo) =====
let proyectos = [];
let editandoId = null;

// ===== DOM =====
const $form = document.getElementById('formProyecto');
const $nombre = document.getElementById('nombre');
const $descripcion = document.getElementById('descripcion');
const $lista = document.getElementById('lista');
const $error = document.getElementById('error');
const $cancelar = document.getElementById('cancelar');

// ===== CREATE / UPDATE =====
$form.addEventListener('submit', e => {
  e.preventDefault();

  const nombre = $nombre.value.trim();
  const descripcion = $descripcion.value.trim();

  // Reglas de negocio
  if (nombre.length < 5) {
    $error.textContent = 'El nombre debe tener al menos 5 caracteres';
    return;
  }

  if (!descripcion) {
    $error.textContent = 'La descripción es obligatoria';
    return;
  }

  $error.textContent = '';

  if (editandoId) {
    // UPDATE
    const proyecto = proyectos.find(p => p.id === editandoId);
    proyecto.nombre = nombre;
    proyecto.descripcion = descripcion;
    editandoId = null;
    $cancelar.disabled = true;
  } else {
    // CREATE
    proyectos.push({
      id: Date.now(),
      nombre,
      descripcion
    });
  }

  $form.reset();
  render();
});

// ===== READ (carga dinámica) =====
function render() {
  $lista.innerHTML = '';

  proyectos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'panel panel-separacion';
    div.innerHTML = `
      <strong>${p.nombre}</strong>
      <p class="texto-chico">${p.descripcion}</p>
      <div class="acciones">
        <button onclick="editar(${p.id})">Editar</button>
        <button onclick="eliminar(${p.id})" class="boton-secundario">Eliminar</button>
      </div>
    `;
    $lista.appendChild(div);
  });
}

// ===== UPDATE =====
function editar(id) {
  const proyecto = proyectos.find(p => p.id === id);
  $nombre.value = proyecto.nombre;
  $descripcion.value = proyecto.descripcion;
  editandoId = id;
  $cancelar.disabled = false;
}

// ===== DELETE =====
function eliminar(id) {
  proyectos = proyectos.filter(p => p.id !== id);
  render();
}

// ===== Cancelar edición =====
$cancelar.addEventListener('click', () => {
  editandoId = null;
  $form.reset();
  $cancelar.disabled = true;
});
