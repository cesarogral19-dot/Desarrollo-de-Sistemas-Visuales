# Backend MERN Stack

Servidor API REST basado en Node.js, Express y MongoDB.

## Características

- ✅ Autenticación con JWT
- ✅ MongoDB con Mongoose
- ✅ RBAC (4 Roles: ADMIN, MANAGER, USER, SUPPORT)
- ✅ CRUD de Solicitudes/Tickets
- ✅ Gestión de Usuarios
- ✅ Generación de reportes PDF
- ✅ Rate limiting
- ✅ Manejo centralizado de errores
- ✅ Middleware de validación

## Instalación

```bash
cd backend
npm install
```

## Configuración

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configurar variables de entorno en `.env`

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm start
```

## Estructura de Carpetas

```
src/
├── config/          # Configuración (BD, constantes)
├── controllers/     # Lógica de negocios
├── models/          # Modelos de datos (Mongoose)
├── routes/          # Rutas de API
├── middlewares/     # Middlewares (auth, validación)
├── services/        # Servicios auxiliares
├── utils/           # Utilidades
└── server.js        # Punto de entrada
```

## Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Obtener usuario actual
- `PUT /api/auth/profile` - Actualizar perfil

### Solicitudes
- `POST /api/solicitudes` - Crear solicitud
- `GET /api/solicitudes` - Listar solicitudes
- `GET /api/solicitudes/:id` - Obtener por ID
- `PUT /api/solicitudes/:id` - Actualizar
- `PATCH /api/solicitudes/:id/status` - Cambiar estado
- `DELETE /api/solicitudes/:id` - Eliminar

### Usuarios (Admin)
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener por ID
- `PUT /api/users/:id` - Actualizar
- `PATCH /api/users/:id/role` - Cambiar role
- `DELETE /api/users/:id` - Eliminar

### Reportes
- `GET /api/reports/stats` - Estadísticas
- `GET /api/reports/detailed` - Reporte detallado
- `GET /api/reports/export-pdf` - Exportar PDF

## Autenticación

Los endpoints protegidos requieren:

Header: `Authorization: Bearer <token>`

O Cookie: `token=<token>`

## Test

```bash
npm test
```
