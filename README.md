# MERN Minimal App

Este es un proyecto mínimo basado en el stack MERN (MongoDB, Express, React, Node.js). La aplicación consiste en un servidor Express que se conecta a una base de datos MongoDB y un cliente React que consume la API del servidor.

## Estructura del Proyecto

```
mern-minimal-app
├── server                # Código del servidor
│   ├── src
│   │   ├── index.js      # Punto de entrada del servidor
│   │   ├── app.js        # Configuración de la aplicación Express
│   │   ├── config
│   │   │   └── db.js     # Configuración de la conexión a MongoDB
│   │   ├── controllers
│   │   │   └── exampleController.js # Controlador de ejemplo
│   │   ├── models
│   │   │   └── User.js    # Modelo de usuario
│   │   └── routes
│   │       └── index.js   # Rutas de la aplicación
│   ├── package.json       # Configuración del servidor
│   └── .env               # Variables de entorno
├── client                 # Código del cliente
│   ├── src
│   │   ├── index.js       # Punto de entrada de la aplicación React
│   │   ├── App.js         # Componente principal de la aplicación
│   │   ├── components
│   │   │   └── Example.jsx # Componente de ejemplo
│   │   └── services
│   │       └── api.js      # Funciones para interactuar con la API
│   ├── public
│   │   └── index.html      # Plantilla HTML principal
│   └── package.json        # Configuración del cliente
├── .gitignore             # Archivos y carpetas a ignorar por Git
└── README.md              # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd mern-minimal-app
   ```

2. Instala las dependencias del servidor:
   ```
   cd server
   npm install
   ```

3. Instala las dependencias del cliente:
   ```
   cd client
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la carpeta `server` y añade la URI de conexión a tu base de datos MongoDB:
   ```
   MONGODB_URI=<TU_URI_DE_MONGODB>
   ```

## Ejecución

1. Para iniciar el servidor, navega a la carpeta `server` y ejecuta:
   ```
   npm start
   ```

2. Para iniciar el cliente, navega a la carpeta `client` y ejecuta:
   ```
   npm start
   ```

## Uso

Accede a la aplicación en tu navegador en `http://localhost:3000`.