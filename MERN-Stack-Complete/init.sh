#!/bin/bash

# =============================================
# Script para inicializar el proyecto MERN
# =============================================

echo "🚀 Inicializando MERN Stack..."

# 1. Crear archivos .env
echo "📝 Creando archivos .env..."

if [ ! -f ".env" ]; then
  echo "✓ Creando .env en raíz..."
  cp .env.example .env
fi

if [ ! -f "backend/.env" ]; then
  echo "✓ Creando .env en backend..."
  cp backend/.env.example backend/.env
fi

if [ ! -f "frontend/.env" ]; then
  echo "✓ Creando .env en frontend..."
  cp frontend/.env.example frontend/.env
fi

# 2. Instalar dependencias (opcional)
read -p "¿Deseas instalar las dependencias localmente? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "📦 Instalando dependencias del backend..."
  cd backend
  npm install
  cd ..

  echo "📦 Instalando dependencias del frontend..."
  cd frontend
  npm install
  cd ..
fi

# 3. Información final
echo ""
echo "✅ Inicialización completada!"
echo ""
echo "📄 Archivos .env creados:"
echo "   - .env (raíz para Docker)"
echo "   - backend/.env"
echo "   - frontend/.env"
echo ""
echo "🚀 Para ejecutar con Docker:"
echo "   docker-compose up -d"
echo ""
echo "💻 Para desarrollo local:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "📖 Documentación:"
echo "   - backend/README.md"
echo "   - frontend/README.md"
echo ""
