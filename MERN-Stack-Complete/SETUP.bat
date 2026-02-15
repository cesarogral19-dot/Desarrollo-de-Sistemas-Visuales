@echo off
REM ╔════════════════════════════════════════════════════════════════════════════╗
REM ║                                                                            ║
REM ║                      🤖 INSTALADOR INTERACTIVO MERN                       ║
REM ║                                                                            ║
REM ║                       Configura todo en minutos                            ║
REM ║                                                                            ║
REM ╚════════════════════════════════════════════════════════════════════════════╝

SETLOCAL ENABLEDELAYEDEXPANSION

cls
color 0A
mode con: cols=80 lines=30

echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
echo                    🚀 INSTALADOR INTERACTIVO MERN STACK
echo.
echo                          Hola! Vamos a configurar todo
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
echo Este asistente te guiará para tener MERN funcionando en minutos.
echo.
pause

REM ─────────────────────────────────────────────────────────────────────────────
REM PASO 1: VERIFICAR NODE.JS
REM ─────────────────────────────────────────────────────────────────────────────

cls
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo [PASO 1/4] Verificando Node.js
echo ════════════════════════════════════════════════════════════════════════════
echo.

node --version >nul 2>&1
if !ERRORLEVEL! neq 0 (
    echo ❌ Node.js NO está instalado
    echo.
    echo Descágalo de: https://nodejs.org
    echo Necesitas versión 18 o superior
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODEVERSION=%%i
echo ✅ Node.js %NODEVERSION% encontrado
echo.
pause

REM ─────────────────────────────────────────────────────────────────────────────
REM PASO 2: VERIFICAR MONGODB
REM ─────────────────────────────────────────────────────────────────────────────

cls
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo [PASO 2/4] Verificando MongoDB
echo ════════════════════════════════════════════════════════════════════════════
echo.

set MONGOPATH=C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe
set MONGOPATH2=C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe

if exist "%MONGOPATH%" (
    echo ✅ MongoDB 6.0 encontrado
    goto mongoOK
) else if exist "%MONGOPATH2%" (
    echo ✅ MongoDB 7.0 encontrado
    set MONGOPATH=%MONGOPATH2%
    goto mongoOK
) else (
    echo ❌ MongoDB NO está instalado
    echo.
    echo Tienes DOS opciones:
    echo.
    echo [1] Descargar e instalar MongoDB Community
    echo    Descarga: https://www.mongodb.com/try/download/community
    echo.
    echo [2] Usar MongoDB Atlas (cloud) - No requiere instalación
    echo    Crear cuenta: https://www.mongodb.com/cloud/atlas
    echo.
    echo ¿Qué prefieres?
    echo    1) Instalar MongoDB localmente (recomendado para desarrollo)
    echo    2) Usar MongoDB Atlas (cloud)
    echo    3) Cancelar
    echo.
    set /p MONGODB_CHOICE=Elige una opción (1/2/3): 
    
    if "!MONGODB_CHOICE!"=="1" (
        powershell "Start-Process 'https://www.mongodb.com/try/download/community' -WindowStyle Maximized"
        echo.
        echo Abre el navegador y descarga MongoDB
        echo Ejecuta el instalador y luego vuelve aquí
        echo.
        pause
        goto :mongodb_check_again
    ) else if "!MONGODB_CHOICE!"=="2" (
        echo.
        echo Para usar MongoDB Atlas:
        echo 1. Crea cuenta en https://www.mongodb.com/cloud/atlas
        echo 2. Crea un cluster gratuito
        echo 3. Obtén la connection string
        echo 4. Actualiza backend/.env con tu MONGODB_URL
        echo.
        echo Cuando termines, presiona una tecla para continuar
        pause
        goto :db_configured
    ) else (
        exit /b 1
    )
)

:mongodb_check_again
set MONGOPATH=C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe
if exist "%MONGOPATH%" (
    echo ✅ Ahora MongoDB está instalado - Continuando...
    goto mongoOK
) else (
    echo ❌ MongoDB aún no está instalado. Intenta de nuevo.
    pause
    goto mongoVerifyAgain
)

:mongoOK
echo.
pause

REM ─────────────────────────────────────────────────────────────────────────────
REM PASO 3: INSTALAR DEPENDENCIAS
REM ─────────────────────────────────────────────────────────────────────────────

:db_configured
cls
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo [PASO 3/4] Instalando dependencias
echo ════════════════════════════════════════════════════════════════════════════
echo.

echo 📥 Backend...
cd backend
if not exist "node_modules" (
    call npm install --silent
) else (
    echo    (ya instalado)
)
cd ..
echo ✅ Backend OK
echo.

echo 📥 Frontend...
cd frontend
if not exist "node_modules" (
    call npm install --silent
) else (
    echo    (ya instalado)
)
cd ..
echo ✅ Frontend OK
echo.
pause

REM ─────────────────────────────────────────────────────────────────────────────
REM PASO 4: RESUMEN
REM ─────────────────────────────────────────────────────────────────────────────

cls
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
echo                    ✅ ¡CONFIGURACIÓN COMPLETADA!
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
echo PRÓXIMOS PASOS:
echo.
echo 1. EJECUTAR EN UNA TERMINAL:
echo    ────────────────────────
echo    
echo    - PowerShell (recomendado):
echo      .\run-backend.ps1
echo    
echo    - O CMD:
echo      cd backend ^& npm run dev
echo.
echo 2. ABRIR OTRA TERMINAL Y EJECUTAR:
echo    ──────────────────────────────
echo    
echo    - PowerShell:
echo      .\run-frontend.ps1
echo    
echo    - O CMD:
echo      cd frontend ^& npm run dev
echo.
echo 3. ABRIR NAVEGADOR:
echo    ────────────────
echo    http://localhost:5173
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
pause

echo.
echo ¿Quieres que abra las terminales automáticamente? (Recomendado)
echo.
set /p AUTO_START=Escribir 'si' para iniciar automáticamente o 'no' para manual: 

if /i "!AUTO_START!"=="si" (
    start "MERN Backend" cmd /k "cd backend && npm run dev"
    timeout /t 2 /nobreak
    start "MERN Frontend" cmd /k "cd frontend && npm run dev"
    echo.
    echo ✅ Terminals abiertas!
    echo    Frontend: http://localhost:5173
    echo    Backend: http://localhost:5000
    echo.
    timeout /t 3 /nobreak
) else (
    echo.
    echo Manual - Abre las terminales tú mismo
    echo.
)

cls
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
echo                          ✅ ¡LISTA PARA USAR!
echo.
echo                    Abre: http://localhost:5173
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
pause
