/*Scrpit para formularios poerta */
/*Estado: lista de reactivos*/
/*Validacion: cantidad minima de reactivos 3*/
const listaReactivos = [];
const formularioReactivos = document.getElementById('formulario');
const textoPregunta = document.querySelector('textoPregunta');
const textoRespuesta1 = document.querySelector('textoRespuesta');
const textoError = document.getElementById('textoError');
const botonAgregar = document.getElementById('btnAgregarRespuesta');
const botonLimpiar = document.getElementById('btnGuardarFormulario');
const listaPreguntas = document.querySelector('listaPreguntas');
const textoVacio = document.querySelector('textoVacio');