#!/bin/bash
# Verificador de integridad del proyecto MERN Stack

echo "🔍 Verificando integridad del proyecto MERN Stack..."
echo "=================================================="

missing_files=0
found_files=0

# Array de archivos a verificar
declare -a files=(
    # Backend
    "backend/package.json"
    "backend/src/server.js"
    "backend/src/config/database.js"
    "backend/src/config/constants.js"
    "backend/src/models/User.js"
    "backend/src/models/Solicitud.js"
    "backend/src/models/Role.js"
    "backend/src/controllers/authController.js"
    "backend/src/controllers/solicitudController.js"
    "backend/src/controllers/userController.js"
    "backend/src/controllers/reportController.js"
    "backend/src/routes/authRoutes.js"
    "backend/src/routes/solicitudRoutes.js"
    "backend/src/routes/userRoutes.js"
    "backend/src/routes/reportRoutes.js"
    "backend/src/middlewares/auth.js"
    "backend/src/middlewares/validation.js"
    "backend/.env.example"
    "backend/Dockerfile"
    "backend/.dockerignore"
    "backend/.eslintrc.js"
    "backend/README.md"
    
    # Frontend
    "frontend/package.json"
    "frontend/index.html"
    "frontend/vite.config.js"
    "frontend/src/main.jsx"
    "frontend/src/App.jsx"
    "frontend/src/services/api.js"
    "frontend/src/context/AuthContext.jsx"
    "frontend/src/hooks/useAuth.js"
    "frontend/src/hooks/useForm.js"
    "frontend/src/components/Navbar.jsx"
    "frontend/src/components/Loading.jsx"
    "frontend/src/pages/Home.jsx"
    "frontend/src/pages/Login.jsx"
    "frontend/src/pages/Register.jsx"
    "frontend/src/pages/Dashboard.jsx"
    "frontend/src/pages/Solicitudes.jsx"
    "frontend/src/pages/Reportes.jsx"
    "frontend/src/pages/Admin.jsx"
    "frontend/src/pages/ProtectedRoute.jsx"
    "frontend/src/styles/variables.css"
    "frontend/src/styles/index.css"
    "frontend/src/styles/navbar.css"
    "frontend/src/styles/auth.css"
    "frontend/src/styles/dashboard.css"
    "frontend/src/styles/solicitudes.css"
    "frontend/src/styles/reportes.css"
    "frontend/src/styles/admin.css"
    "frontend/src/assets/icons/solicitud.svg"
    "frontend/src/assets/icons/reporte.svg"
    "frontend/src/assets/icons/usuario.svg"
    "frontend/.env.example"
    "frontend/Dockerfile"
    "frontend/nginx.conf"
    "frontend/.dockerignore"
    "frontend/.eslintrc.js"
    "frontend/README.md"
    
    # Docker
    "docker-compose.yml"
    "init.sh"
    "init.bat"
    ".env.example"
    ".gitignore"
    
    # Documentación
    "README.md"
    "QUICKSTART.md"
    "DEPLOYMENT.md"
    "CONTRIBUTING.md"
    "CHANGELOG.md"
)

# Verificar cada archivo
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
        ((found_files++))
    else
        echo "❌ $file (FALTA)"
        ((missing_files++))
    fi
done

echo ""
echo "=================================================="
echo "📊 RESULTADOS:"
echo "   ✅ Encontrados: $found_files"
echo "   ❌ Faltantes: $missing_files"
echo ""

if [ $missing_files -eq 0 ]; then
    echo "🎉 ¡TODOS LOS ARCHIVOS ESTÁN PRESENTES!"
    echo ""
    echo "🚀 Tu proyecto MERN está listo para:"
    echo "   1. docker-compose up -d"
    echo "   2. Abrir http://localhost:3000"
    echo "   3. ¡Comenzar a desarrollar!"
    exit 0
else
    echo "⚠️  Algunos archivos están faltando."
    echo "   Por favor revisa los archivos marcados con ❌"
    exit 1
fi
