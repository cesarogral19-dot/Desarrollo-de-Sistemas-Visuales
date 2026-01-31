import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Seleccionamos el elemento 'root' del HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento root. Revisa tu index.html");
}