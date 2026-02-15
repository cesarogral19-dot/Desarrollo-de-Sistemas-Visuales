# Frontend MERN Stack

Interfaz de usuario construida con React + Vite.

## Características

- ✅ Autenticación JWT
- ✅ Rutas protegidas
- ✅ Contexto de autenticación global
- ✅ Formularios con validación
- ✅ Tabla de solicitudes con paginación
- ✅ Reportes y exportación PDF
- ✅ Interfaz responsiva
- ✅ Animaciones CSS
- ✅ Modo oscuro

## Instalación

```bash
cd frontend
npm install
```

## Configuración

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configurar variables de entorno

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estructura de Carpetas

```
src/
├── components/      # Componentes reutilizables
├── pages/           # Páginas principales
├── layouts/         # Layouts
├── hooks/           # Hooks personalizados
├── context/         # Context API
├── services/        # Llamadas a API
├── middleware/      # Middleware de rutas
├── styles/          # CSS global y temas
├── assets/          # Imágenes y SVG
├── App.jsx          # Componente principal
└── main.jsx         # Punto de entrada
```

## Páginas Principales

- **Home** - Página inicial
- **Login** - Autenticación
- **Register** - Registro de usuario
- **Dashboard** - Panel principal
- **Solicitudes** - Gestión de solicitudes
- **Reportes** - Reportes y estadísticas
- **Admin** - Panel de administrador

## Componentes

- **Navbar** - Barra de navegación
- **Loading** - Indicador de carga
- **ProtectedRoute** - Ruta protegida
- **Card** - Tarjeta de contenido
- **Modal** - Modal de diálogo
- **Form** - Formulario base

## Hooks Personalizados

- `useAuth()` - Contexto de autenticación
- `useForm()` - Gestión de formularios
