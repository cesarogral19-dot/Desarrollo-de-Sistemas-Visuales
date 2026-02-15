# 🚀 MERN Stack - Aplicación Fullstack Completa

Una aplicación profesional Fullstack basada en **MongoDB, Express, React, Node.js** con arquitectura de contenedores Docker.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tech Stack](#tech-stack)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [API Endpoints](#api-endpoints)
- [Autenticación](#autenticación)
- [Roles y Permisos](#roles-y-permisos)
- [Docker](#docker)
- [Documentación Adicional](#documentación-adicional)

## ✨ Características

### Backend
- ✅ **Node.js + Express** - Servidor API REST robusto
- ✅ **MongoDB + Mongoose** - Base de datos NoSQL con validaciones
- ✅ **Autenticación JWT** - Tokens seguros con expiración
- ✅ **RBAC** - Control de acceso basado en roles (4 roles)
- ✅ **Validación de datos** - express-validator para entrada segura
- ✅ **Encriptación** - bcryptjs para contraseñas
- ✅ **CRUD completo** - Solicitudes, usuarios, reportes
- ✅ **Generación de PDF** - Exportación de reportes
- ✅ **Rate Limiting** - Protección contra abuso
- ✅ **CORS configurado** - Seguridad de origen cruzado
- ✅ **Manejo de errores** - Middleware centralizado
- ✅ **Health checks** - Monitoreo de salud de servicios

### Frontend
- ✅ **React 18** - UI moderna y eficiente
- ✅ **Vite** - Bundler rápido
- ✅ **React Router** - Navegación SPA
- ✅ **Context API** - Gestión de estado global
- ✅ **Hooks personalizados** - useAuth, useForm
- ✅ **Formularios con validación** - Validación en tiempo real
- ✅ **localStorage** - Persistencia de datos
- ✅ **CSS modular** - Variables CSS y diseño responsivo
- ✅ **Animaciones** - Transiciones y efectos
- ✅ **Interfaz responsiva** - Mobile-friendly
- ✅ **Rutas protegidas** - ProtectedRoute component
- ✅ **Exportación PDF** - jsPDF + html2canvas

### DevOps
- ✅ **Docker** - Contenedores para cada servicio
- ✅ **Docker Compose** - Orquestación de servicios
- ✅ **Multi-stage builds** - Optimización de imágenes
- ✅ **Health checks** - Verificación de servicios
- ✅ **Nginx** - Servidor web y proxy inverso
- ✅ **Volúmenes persistentes** - Para MongoDB
- ✅ **Variables de entorno** - Configuración flexible

## 🛠️ Tech Stack

### Backend
```
Node.js 18.x
├── express ^4.18.2
├── mongoose ^7.5.0
├── bcryptjs ^2.4.3
├── jsonwebtoken ^9.1.0
├── express-validator ^7.0.0
├── pdfkit ^0.13.0
├── cors ^2.8.5
├── dotenv ^16.3.1
├── morgan ^1.10.0
├── helmet ^7.0.0
└── express-rate-limit ^7.0.0
```

### Frontend
```
React 18.x + Vite
├── react-router-dom ^6.16.0
├── axios ^1.5.0
├── jspdf ^2.5.1
├── html2canvas ^1.4.1
├── date-fns ^2.30.0
├── react-toastify ^9.1.3
└── zustand ^4.4.1 (opcional)
```

### DevOps
```
Docker & Docker Compose
├── Node.js 18 Alpine (Backend)
├── Node.js 18 Alpine + Nginx (Frontend)
├── MongoDB 6.0 Alpine
└── Nginx Alpine
```

## 📁 Estructura del Proyecto

```
MERN-Stack-Complete/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js         # Conexión a MongoDB
│   │   │   └── constants.js        # Constantes de la app
│   │   ├── controllers/
│   │   │   ├── authController.js   # Auth (login, register)
│   │   │   ├── solicitudController.js # CRUD solicitudes
│   │   │   ├── userController.js   # Gestión usuarios
│   │   │   └── reportController.js # Reportes y PDF
│   │   ├── models/
│   │   │   ├── User.js             # Schema usuario
│   │   │   ├── Solicitud.js        # Schema solicitud
│   │   │   └── Role.js             # Schema rol
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Rutas auth
│   │   │   ├── solicitudRoutes.js  # Rutas solicitudes
│   │   │   ├── userRoutes.js       # Rutas usuarios
│   │   │   └── reportRoutes.js     # Rutas reportes
│   │   ├── middlewares/
│   │   │   ├── auth.js             # JWT + RBAC
│   │   │   └── validation.js       # Validación
│   │   ├── services/               # Lógica de negocio
│   │   ├── utils/                  # Utilidades
│   │   └── server.js               # Punto de entrada
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Card.jsx (plantilla)
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Solicitudes.jsx (plantilla)
│   │   │   ├── Reportes.jsx (plantilla)
│   │   │   └── Admin.jsx (plantilla)
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useForm.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js              # Cliente axios
│   │   ├── middleware/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── styles/
│   │   │   ├── variables.css       # Variables globales
│   │   │   ├── index.css           # Estilos globales
│   │   │   ├── navbar.css
│   │   │   ├── auth.css
│   │   │   └── dashboard.css
│   │   ├── assets/
│   │   │   ├── icons/
│   │   │   └── images/
│   │   ├── App.jsx                 # App principal
│   │   └── main.jsx                # Punto de entrada
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   ├── .env.example
│   ├── vite.config.js
│   ├── index.html
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── init.sh                         # Script bash
├── init.bat                        # Script Windows
└── README.md                       # Este archivo
```

## 🚀 Instalación

### Requisitos Previos

- **Node.js** 18+ 
- **npm** 8+
- **Docker** 20.10+ (opcional, para contenedores)
- **Docker Compose** 2.0+ (opcional)

### Paso 1: Clonar o Descargar

```bash
# Descargar el proyecto
cd MERN-Stack-Complete
```

### Paso 2: Inicializar Archivos .env

**Opción A: Automático (Linux/Mac)**
```bash
chmod +x init.sh
./init.sh
```

**Opción B: Automático (Windows)**
```cmd
init.bat
```

**Opción C: Manual**
```bash
# Copiar archivos .env
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Editar según necesidad
nano .env              # o tu editor preferido
```

### Paso 3: Instalar Dependencias (Desarrollo Local)

```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

## ⚙️ Configuración

### Variables de Entorno Principales

**Backend (.env)**
```env
# Base de datos
MONGODB_URI=mongodb://admin:password123@mongodb:27017/mern-stack
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Servidor
PORT=5000
NODE_ENV=production
API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:3000

# Seguridad
BCRYPT_ROUNDS=10
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=MERN Application
VITE_APP_ENVIRONMENT=production
```

## 🎯 Ejecución

### Desarrollo Local (Sin Docker)

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# ✓ Servidor ejecutando en http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# ✓ App ejecutando en http://localhost:3000
```

### Production con Docker

```bash
# Construir e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

**URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: localhost:27017

### Comandos Útiles

```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Ejecutar comando en contenedor
docker-compose exec backend npm test

# Rebuild
docker-compose build --no-cache
```

## 📡 API Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |
| GET | `/api/auth/me` | Obtener usuario actual |
| PUT | `/api/auth/profile` | Actualizar perfil |
| POST | `/api/auth/change-password` | Cambiar contraseña |

### Solicitudes

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/solicitudes` | Crear solicitud | ✅ |
| GET | `/api/solicitudes` | Listar solicitudes | ✅ |
| GET | `/api/solicitudes/:id` | Obtener por ID | ✅ |
| PUT | `/api/solicitudes/:id` | Actualizar | ✅ |
| PATCH | `/api/solicitudes/:id/status` | Cambiar estado | ✅ |
| PATCH | `/api/solicitudes/:id/assign` | Asignar | ✅ |
| POST | `/api/solicitudes/:id/comments` | Añadir comentario | ✅ |
| DELETE | `/api/solicitudes/:id` | Eliminar | ✅ |

### Usuarios (Admin)

| Método | Ruta | Descripción | Auth | Role |
|--------|------|-------------|------|------|
| GET | `/api/users` | Listar usuarios | ✅ | ADMIN |
| GET | `/api/users/:id` | Obtener por ID | ✅ | ADMIN |
| PUT | `/api/users/:id` | Actualizar | ✅ | ADMIN |
| PATCH | `/api/users/:id/role` | Cambiar role | ✅ | ADMIN |
| PATCH | `/api/users/:id/status` | Cambiar estado | ✅ | ADMIN |
| DELETE | `/api/users/:id` | Eliminar | ✅ | ADMIN |

### Reportes

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/reports/stats` | Estadísticas | ✅ |
| GET | `/api/reports/detailed` | Reporte detallado | ✅ |
| GET | `/api/reports/user-summary` | Resumen por usuario | ✅ |
| GET | `/api/reports/export-pdf` | Exportar a PDF | ✅ |

## 🔐 Autenticación

### Flujo de Autenticación

1. **Login **
   ```bash
   POST /api/auth/login
   {
     "email": "usuario@example.com",
     "password": "password123"
   }
   ```
   
   Respuesta:
   ```json
   {
     "success": true,
     "token": "eyJhbGc...",
     "user": { "id": "...", "email": "...", "role": "..." }
   }
   ```

2. **Token en Headers**
   ```bash
   Authorization: Bearer eyJhbGc...
   ```

3. **Token en Cookies**
   ```
   Cookie: token=eyJhbGc...
   ```

### JWT

- **Algoritmo**: HS256
- **Expiración**: 7 días (configurable)
- **Payload**: `_id`, `email`, `role`

## 👥 Roles y Permisos

### Roles Disponibles

| Role | Descripción | Permisos |
|------|-------------|----------|
| **ADMIN** | Administrador del sistema | Acceso total, gestión de usuarios |
| **MANAGER** | Gestor de solicitudes | Aprobar/rechazar, asignar, ver reportes |
| **USER** | Usuario normal | Crear solicitudes, ver las suyas |
| **SUPPORT** | Soporte técnico | Ver todas las solicitudes, asignar |

### Matrix de Permisos

| Acción | USER | SUPPORT | MANAGER | ADMIN |
|--------|------|---------|---------|-------|
| Crear solicitud | ✅ | ✅ | ✅ | ✅ |
| Ver propias | ✅ | ✅ | ✅ | ✅ |
| Ver todas | ❌ | ✅ | ✅ | ✅ |
| Aprobar | ❌ | ✅ | ✅ | ✅ |
| Rechazar | ❌ | ✅ | ✅ | ✅ |
| Asignar | ❌ | ✅ | ✅ | ✅ |
| Ver reportes | ❌ | ✅ | ✅ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ❌ | ✅ |
| Cambiar roles | ❌ | ❌ | ❌ | ✅ |

## 🐳 Docker

### Arquitectura

```
Frontend
  ├─ Node 18 + Vite
  └─ Nginx (port 3000)
     └─ API proxy al Backend

Backend
  ├─ Node 18 + Express
  ├─ PORT 5000
  └─ MongoDB client

MongoDB
  └─ PORT 27017
     └─ Volumen persistente
```

### Build y Deploy

```bash
# Build individual
docker build -t mern-backend:latest ./backend
docker build -t mern-frontend:latest ./frontend

# Build con compose
docker-compose build

# Push a registry (opcional)
docker tag mern-backend:latest username/mern-backend:latest
docker push username/mern-backend:latest
```

### Health Checks

Cada servicio incluye health checks:

- **Backend**: GET `/api/health`
- **Frontend**: GET `/health`
- **MongoDB**: `mongosh` command

### Volúmenes

```bash
# Ver volúmenes
docker volume ls

# Inspeccionar datos
docker volume inspect mern-stack-complete_mongodb_data

# Backup
docker run -v mern-stack-complete_mongodb_data:/data \
  -v $(pwd):/backup mongo:6.0-alpine \
  mongodump --out /backup/dump
```

## 📖 Documentación Adicional

- [Backend README](./backend/README.md) - Documentación de API
- [Frontend README](./frontend/README.md) - Documentación de UI

## 🔍 Troubleshooting

### Puerto en uso
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB no conecta
```bash
# Verificar que MongoDB está corriendo
docker-compose logs mongodb

# Resetear
docker-compose down -v
docker-compose up -d
```

### CORS error
Editar `backend/src/server.js`:
```javascript
cors({
  origin: 'http://tu-dominio.com',
  credentials: true
})
```

## 📝 Licencia

MIT - Libre para uso personal y comercial

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repo
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si necesitas ayuda:

1. Revisa la documentación en `backend/README.md` y `frontend/README.md`
2. Verifica los logs: `docker-compose logs -f`
3. Consulta el troubleshooting arriba

---

**Desarrollado con ❤️ para desarrolladores que valorizan la calidad y la escalabilidad**
