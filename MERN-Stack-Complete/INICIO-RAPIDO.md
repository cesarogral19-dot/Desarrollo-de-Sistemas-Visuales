# 🚀 TUTORIAL DE INICIO RÁPIDO - MERN STACK

## ¿QUÉ TIENES?

Un proyecto **profesional, completo y listo para usar** con:
- ✅ Backend: Node.js + Express + MongoDB
- ✅ Frontend: React + Vite + React Router
- ✅ Docker: Toda la infraestructura containerizada
- ✅ Documentación: 5 guías completas

---

## 📋 PRE-REQUISITOS (IMPORTANTE)

Asegúrate de tener instalado:

### Opción A: Con Docker (RECOMENDADO)
```bash
✅ Docker Desktop: https://www.docker.com/products/docker-desktop
✅ Docker Compose: Viene incluido con Docker Desktop
```

**Verificar instalación:**
```bash
docker --version
docker-compose --version
```

### Opción B: Sin Docker (Desarrollo Local)
```bash
✅ Node.js 18+: https://nodejs.org/
✅ MongoDB Community: https://www.mongodb.com/try/download/community
```

---

## 🎯 OPCIÓN 1: EJECUTAR CON DOCKER (5 MINUTOS)

Este es el método más simple y recomendado.

### Paso 1: Preparar variables de entorno

```bash
# En la carpeta raíz del proyecto
cp .env.example .env
```

**El archivo `.env` debe verse así:**
```env
NODE_ENV=development
PORT=5000

MONGODB_USER=mernuser
MONGODB_PASSWORD=mernpassword123
MONGODB_URL=mongodb://mernuser:mernpassword123@mongodb:27017/mern_db

JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRE=7d

BCRYPT_ROUNDS=10

CLIENT_URL=http://localhost:3000
```

### Paso 2: Iniciar los contenedores

```bash
cd /ruta/a/tu/proyecto
docker-compose up -d
```

**Esperado:**
```
✓ Creating mongodb ... done
✓ Creating backend ... done  
✓ Creating frontend ... done
```

### Paso 3: Verificar que todo esté corriendo

```bash
docker-compose ps
```

**Esperado:**
```
NAME          STATUS          PORTS
mongodb       Up              27017/tcp
backend       Up              5000/tcp
frontend      Up              80/tcp
```

### Paso 4: Abrir en el navegador

```
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api
```

### ✅ Listo para usar!

---

## 🎯 OPCIÓN 2: DESARROLLO LOCAL (10 MINUTOS)

### Paso 1: Instalar MongoDB Localmente

#### En Windows:
```powershell
# Descarga de https://www.mongodb.com/try/download/community
# Ejecuta el instalador
# MongoDB se inicia automáticamente en el puerto 27017
```

#### En Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### En Linux:
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Paso 2: Configurar variables backend

```bash
cd backend
cp .env.example .env
```

**Editar `backend/.env`:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URL=mongodb://localhost:27017/mern_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
CLIENT_URL=http://localhost:5173
```

### Paso 3: Instalar dependencias backend

```bash
cd backend
npm install
```

### Paso 4: Iniciar backend

```bash
# En la carpeta backend
npm run dev
```

**Esperado:**
```
✓ Server running on port 5000
✓ Connected to MongoDB
✓ Health check: GET http://localhost:5000/api/health
```

### Paso 5: Configurar variables frontend

En **otra terminal**:

```bash
cd frontend
cp .env.example .env
```

**El archivo `frontend/.env` debe ser:**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=MERN App
VITE_APP_ENVIRONMENT=development
```

### Paso 6: Instalar dependencias frontend

```bash
cd frontend
npm install
```

### Paso 7: Iniciar frontend

```bash
# En la carpeta frontend
npm run dev
```

**Esperado:**
```
✓ VITE v5.0.0  ready in 500 ms
✓ http://localhost:5173/
```

### Paso 8: Abrir en navegador

```
http://localhost:5173
```

### ✅ Listo para desarrollar!

---

## 🧪 PROBAR LA APLICACIÓN

### Crear una cuenta

1. Haz clic en **"Registrarse"**
2. Completa los campos:
   - Nombre: `Juan`
   - Apellido: `Pérez`
   - Email: `juan@ejemplo.com`
   - Contraseña: `Segura123!`
   - Confirmar: `Segura123!`
3. Haz clic en **"Registrarse"**

### Acceder a la cuenta

1. Email: `juan@ejemplo.com`
2. Contraseña: `Segura123!`
3. Haz clic en **"Iniciar sesión"**

### Explorar características

#### Panel Principal (Dashboard)
- Ver estadísticas
- Últimas solicitudes
- Información del usuario

#### Crear Solicitud
- Ir a **"Solicitudes"**
- Llenar formulario
- Ver lista de solicitudes

#### Ver Reportes
- Ir a **"Reportes"**
- Descargar PDF
- Ver estadísticas

---

## 🐛 SOLUCIONAR PROBLEMAS

### Docker: Puerto ya en uso

```bash
# Ver qué está usando el puerto
docker ps
docker-compose down  # Detener los contenedores

# O cambiar puerto en docker-compose.yml
# Cambiar "5000:5000" por "5001:5000"
```

### MongoDB: Conexión rechazada

```bash
# Con Docker:
docker-compose logs mongodb
docker-compose restart mongodb

# Localmente:
# Verificar que MongoDB esté corriendo
brew services list  # Mac
sudo systemctl status mongodb  # Linux
```

### Frontend no se conecta al Backend

```bash
# Verificar que VITE_API_BASE_URL está correcto
cat frontend/.env

# Limpiar cache y reinstalar
rm -rf frontend/node_modules frontend/dist
npm ci
npm run dev
```

### Error: EACCES (permisos en Linux/Mac)

```bash
# Dar permisos de ejecución
chmod +x init.sh verify-project.sh
chmod +x verify-project.ps1
```

---

## 📁 ESTRUCTURA DE CARPETAS IMPORTANTE

```
MERN-Stack-Complete/
├── backend/              # API Express + MongoDB
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── frontend/             # React + Vite
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml    # Define servicios
├── .env.example         # Variables principales
├── README.md            # Documentación completa
├── QUICKSTART.md        # Este archivo
└── DEPLOYMENT.md        # Para producción
```

---

## 📚 DOCUMENTACIÓN DISPONIBLE

| Archivo | Para qué | Leer si... |
|---------|----------|-----------|
| **README.md** | Documentación completa | Quieres entender todo |
| **QUICKSTART.md** | Inicio rápido (este archivo) | Es tu primer día |
| **PROJECT_SUMMARY.md** | Resumen del proyecto | Quieres un vistazo rápido |
| **backend/README.md** | Documentación API | Trabajas con endpoints |
| **frontend/README.md** | Documentación UI | Trabajas con React |
| **DEPLOYMENT.md** | Guía de producción | Vas a deployar |
| **CONTRIBUTING.md** | Guía de contribución | Trabajas en equipo |

---

## 🎓 PRIMEROS PASOS DE DESARROLLO

### Agregar una nueva página

**1. Crear archivo en `frontend/src/pages/MiPagina.jsx`:**
```jsx
export default function MiPagina() {
  return (
    <div className="container">
      <h1>Mi Nueva Página</h1>
    </div>
  );
}
```

**2. Agregar ruta en `frontend/src/App.jsx`:**
```jsx
import MiPagina from './pages/MiPagina';

// Adentro del <Routes>:
<Route path="/mipagina" element={<MiPagina />} />
```

### Agregar un nuevo endpoint

**1. En `backend/src/controllers/miController.js`:**
```javascript
export async function miEndpoint(req, res) {
  // Tu lógica
}
```

**2. En `backend/src/routes/misRutas.js`:**
```javascript
router.get('/mi-endpoint', miEndpoint);
```

**3. En `backend/src/server.js`:**
```javascript
app.use('/api/mi', misRutas);
```

---

## 🚀 COMANDOS ÚTILES

### Docker

```bash
# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Entrar en contenedor
docker-compose exec backend bash
docker-compose exec mongodb mongosh

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose up -d --build
```

### Desarrollo Local

```bash
# Backend
npm run dev      # Iniciar en desarrollo
npm run build    # Compilar para producción
npm test         # Ejecutar tests

# Frontend
npm run dev      # Iniciar Vite
npm run build    # Build para producción
npm run preview  # Previsualizar build
npm run lint     # Verificar código
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de comenzar, ejecuta:

### En Windows PowerShell:
```bash
.\verify-project.ps1
```

### En Mac/Linux:
```bash
./verify-project.sh
```

Esperado: **"¡TODOS LOS ARCHIVOS ESTÁN PRESENTES!"**

---

## 🤔 PREGUNTAS FRECUENTES

**P: ¿Qué es esto?**
R: Un proyecto MERN (MongoDB, Express, React, Node.js) profesional y completo.

**P: ¿Puedo usarlo para mi portfolio?**
R: ¡Sí! Es ideal para mostrar tus habilidades fullstack.

**P: ¿Puedo modificar el código?**
R: ¡Por supuesto! Es tu proyecto, hazlo tuyo.

**P: ¿Hay tests?**
R: No, pero es un excelente lugar para agregarlos.

**P: ¿Cómo agrego TypeScript?**
R: Hay guías en DEPLOYMENT.md o agrega `npm install -D typescript`

**P: ¿Cómo deployo a producción?**
R: Lee DEPLOYMENT.md - tiene guías para Vercel, Heroku, AWS, etc.

---

## 🎯 SIGUIENTE PASO

Elige una opción:

### Para usuarios sin Docker:
```
👉 Ejecuta: OPCIÓN 2 (Desarrollo Local)
   npm install en backend y frontend
   npm run dev en ambas carpetas
```

### Para usuarios con Docker:
```
👉 Ejecuta: OPCIÓN 1 (Docker)
   cp .env.example .env
   docker-compose up -d
```

### Si algo falla:
```
👉 Lee: SOLUCIONAR PROBLEMAS (arriba)
👉 Lee: README.md (documentación completa)
```

---

## 🎉 CONCLUSIÓN

Ahora tienes:
- ✅ Un backend completamente funcional
- ✅ Un frontend completamente funcional
- ✅ Base de datos MongoDB
- ✅ Autenticación JWT
- ✅ Control de roles (RBAC)
- ✅ 7 páginas listas
- ✅ Docker configurado
- ✅ Documentación completa

**¡Es hora de comenzar a desarrollar!** 🚀

---

**¿Necesitas ayuda?**
- Lee README.md para documentación completa
- Revisa PROJECT_SUMMARY.md para un resumen
- Consulta DEPLOYMENT.md para ir a producción
- Abre los archivos y lee los comentarios en el código

**¡Happy Coding!** 💻✨
