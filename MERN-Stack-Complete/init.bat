@echo off
REM =============================================
REM Script para inicializar el proyecto MERN
REM =============================================

echo 🚀 Inicializando MERN Stack...

REM 1. Crear archivos .env
echo 📝 Creando archivos .env...

if not exist ".env" (
  echo ✓ Creando .env en raíz...
  copy .env.example .env
) else (
  echo - .env ya existe en raíz
)

if not exist "backend\.env" (
  echo ✓ Creando .env en backend...
  copy backend\.env.example backend\.env
) else (
  echo - backend\.env ya existe
)

if not exist "frontend\.env" (
  echo ✓ Creando .env en frontend...
  copy frontend\.env.example frontend\.env
) else (
  echo - frontend\.env ya existe
)

echo.
echo ✅ Inicialización completada!
echo.
echo 📄 Archivos .env creados:
echo    - .env (raíz para Docker)
echo    - backend\.env
echo    - frontend\.env
echo.
echo 🚀 Para ejecutar con Docker:
echo    docker-compose up -d
echo.
echo 💻 Para desarrollo local:
echo    Backend:  cd backend ^& npm run dev
echo    Frontend: cd frontend ^& npm run dev
echo.
echo 📖 Documentación:
echo    - backend\README.md
echo    - frontend\README.md
echo.
pause
