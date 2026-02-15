# 🚀 Guía de Inicio Rápido

¡Felicidades! Has descargado un proyecto MERN completo y profesional. Aquí te mostramos cómo empezar en 5 minutos.

## ⚡ Opción 1: Con Docker (Recomendado)

### Requisitos
- Docker instalado
- Docker Compose instalado

### Pasos

```bash
# 1. Navega a la carpeta del proyecto
cd MERN-Stack-Complete

# 2. Copia el archivo de configuración
cp .env.example .env

# 3. Inicia los servicios
docker-compose up -d

# 4. Espera 30 segundos para que se inicialice MongoDB

# 5. ¡Accede a la app!
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

### Primeros Pasos
1. Abre http://localhost:3000 en tu navegador
2. Haz clic en "Registrarse"
3. Crea una cuenta con:
   - Nombre: Tu nombre
   - Apellido: Tu apellido
   - Email: tumail@ejemplo.com
   - Contraseña: password123
4. ¡Ya estás dentro! 🎉

### Parar los servicios
```bash
docker-compose down
```

---

## 💻 Opción 2: Desarrollo Local (Sin Docker)

### Requisitos
- Node.js 18+
- npm 8+
- MongoDB corriendo localmente (o ajusta MONGODB_URI en .env)

### Pasos

**Backend:**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
# ✓ Servidor escuchando en http://localhost:5000
```

**Frontend (en otra terminal):**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
# ✓ App en http://localhost:3000
```

---

## 📁 Estructura Rápida

```
MERN-Stack-Complete/
├── backend/           # API Express + Node
│   ├── src/
│   │   ├── models/    # Mongoose schemas
│   │   ├── routes/    # Endpoints API
│   │   ├── controllers/ # Lógica de negocio
│   │   └── middlewares/ # Auth, validación
│   └── README.md
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── pages/     # Páginas de la app
│   │   ├── components/ # Componentes reutilizables
│   │   └── context/   # Estado global
│   └── README.md
├── docker-compose.yml # Orquestación
└── README.md         # Documentación completa
```

---

## 🔐 Credenciales de Desarrollo

Después de crear una cuenta, puedes crear usurios adicionales con diferentes roles:

**Con Docker:**
```bash
# Acceder al contenedor de MongoDB
docker-compose exec mongodb mongosh

# En la shell de MongoDB
use mern-stack
db.users.updateOne(
  { email: "tumail@ejemplo.com" },
  { $set: { role: "ADMIN" } }
)
```

**Roles disponibles:**
- `USER` - Usuario normal
- `SUPPORT` - Soporte técnico
- `MANAGER` - Gestor de solicitudes
- `ADMIN` - Administrador (acceso total)

---

## 📡 Test de API

```bash
# 1. Registrar usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan@test.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@test.com",
    "password": "password123"
  }'

# 3. Usar el token en requests
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 🛠️ Comandos Útiles

### Backend
```bash
cd backend

npm run dev        # Desarrollo con nodemon
npm start          # Producción
npm run lint       # Linter
npm test           # Tests
```

### Frontend
```bash
cd frontend

npm run dev        # Desarrollo
npm run build      # Build para producción
npm run lint       # Linter
npm run preview    # Preview del build
```

### Docker
```bash
docker-compose up -d        # Iniciar
docker-compose down         # Parar
docker-compose logs -f      # Ver logs
docker-compose ps           # Ver estado
docker-compose rebuild      # Reconstruir
```

---

## 🐛 Troubleshooting Rápido

### "Puerto 3000/5000 ya en uso"
```bash
# Cambiar en .env
FRONTEND_PORT=3001
BACKEND_PORT=5001
```

### "MongoDB no conecta"
```bash
# Verificar que MongoDB está corriendo
docker-compose logs mongodb

# O resetear
docker-compose down -v
docker-compose up -d
```

### "CORS error"
Editar `backend/src/server.js` y cambiar:
```javascript
origin: 'http://tu-dominio.com'
```

---

## 📚 Documentación Completa

- **Backend**: [backend/README.md](./backend/README.md)
- **Frontend**: [frontend/README.md](./frontend/README.md)
- **Guía de Contribución**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)

---

## 🎯 Próximos Pasos

1. **Explorar el código** - Entiende la estructura
2. **Crear una solicitud** - Test las funcionalidades
3. **Cambiar estilos** - Personaliza los colores en `variables.css`
4. **Agregar features** - Extiende la funcionalidad
5. **Desplegar** - Publica tu app (Vercel, Netlify, Heroku, DigitalOcean)

---

## ❓ ¿Necesitas ayuda?

1. Lee la documentación de README.md completo
2. Revisa los comentarios en el código
3. Chequea los logs: `docker-compose logs`
4. Consulta la guía de troubleshooting

---

## 🎉 ¡Felicidades!

Ya tienes un proyecto MERN profesional listo para:
- ✅ Desarrollo
- ✅ Pruebas
- ✅ Producción
- ✅ Escalabilidad

**¡Happy Coding! 💻**
