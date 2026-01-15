// ...existing code...
const formulario = document.getElementById('formulario');
const inputMarca = document.getElementById('marca');
const inputPais = document.getElementById('pais');
const textareaDescripcion = document.getElementById('descripcion');
const inputAnio = document.getElementById('anio');
const listaMarcas = document.getElementById('listaMarcas');
const textoError = document.getElementById('textoError');
const textoVacio = document.getElementById('textoVacio');
const btnAgregar = document.getElementById('btnAgregar');
const btnLimpiarFormulario = document.getElementById('btnLimpiarFormulario');
const btnLimpiarLista = document.getElementById('btnLimpiarLista');

if (!formulario || !inputMarca || !inputPais || !textareaDescripcion || !listaMarcas || !textoError || !textoVacio || !btnAgregar || !btnLimpiarFormulario || !btnLimpiarLista) {
    console.error('Faltan elementos del DOM requeridos.');
    // no lanzar para que el entorno no se rompa; revisar en consola
}

let marcas = [];

function escapeHtml(text = '') {
    return String(text)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function validar(marca, pais, descripcion, anio) {
    const errores = [];
    if (!marca || marca.trim().length < 2) errores.push('La marca debe tener al menos 2 caracteres.');
    if (!pais || pais.trim().length < 2) errores.push('El país de origen debe tener al menos 2 caracteres.');
    if (!descripcion || descripcion.trim().length < 10) errores.push('La descripción debe tener al menos 10 caracteres.');
    if (anio) {
        const y = Number(anio);
        const actual = new Date().getFullYear();
        if (Number.isNaN(y) || y < 1800 || y > actual) errores.push(`El año debe ser un número entre 1800 y ${actual}.`);
    }
    return errores;
}

function mostrarErrores(errores) {
    if (!textoError) return;
    if (errores.length === 0) {
        textoError.style.display = 'none';
        textoError.innerHTML = '';
        btnAgregar.disabled = false;
        return;
    }
    textoError.style.display = 'block';
    textoError.innerHTML = errores.map(e => `<div>• ${escapeHtml(e)}</div>`).join('');
    btnAgregar.disabled = true;
}

function render() {
    if (!listaMarcas) return;
    listaMarcas.innerHTML = '';
    if (marcas.length === 0) {
        textoVacio.style.display = 'block';
        return;
    }
    textoVacio.style.display = 'none';
    marcas.forEach((m, i) => {
        const li = document.createElement('li');
        li.className = 'marca-item';
        li.innerHTML = `
            <div><strong>${escapeHtml(m.marca)}</strong> <small>(${escapeHtml(m.pais)}${m.anio ? ` - ${escapeHtml(m.anio)}` : ''})</small></div>
            <div>${escapeHtml(m.descripcion)}</div>
            <div style="margin-top:6px;">
                <button type="button" data-index="${i}" class="btn-eliminar">Eliminar</button>
            </div>
        `;
        listaMarcas.appendChild(li);
    });
}

function limpiarFormulario() {
    if (!formulario) return;
    formulario.reset();
    mostrarErrores([]);
    inputMarca.focus();
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const marca = inputMarca.value;
    const pais = inputPais.value;
    const descripcion = textareaDescripcion.value;
    const anio = inputAnio.value;

    const errores = validar(marca, pais, descripcion, anio);
    mostrarErrores(errores);
    if (errores.length > 0) return;

    marcas.push({ marca: marca.trim(), pais: pais.trim(), descripcion: descripcion.trim(), anio: anio ? anio.trim() : '' });
    render();
    limpiarFormulario();
});

btnLimpiarFormulario.addEventListener('click', limpiarFormulario);

btnLimpiarLista.addEventListener('click', () => {
    if (!confirm('¿Deseas limpiar toda la lista de marcas?')) return;
    marcas = [];
    render();
});

listaMarcas.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-eliminar');
    if (!btn) return;
    const index = Number(btn.dataset.index);
    if (!Number.isNaN(index)) {
        marcas.splice(index, 1);
        render();
    }
});

[inputMarca, inputPais, textareaDescripcion, inputAnio].forEach(el => {
    if (!el) return;
    el.addEventListener('input', () => {
        const errores = validar(inputMarca.value, inputPais.value, textareaDescripcion.value, inputAnio.value);
        mostrarErrores(errores);
    });
});

// render inicial
mostrarErrores([]);
render();
// ...existing code...