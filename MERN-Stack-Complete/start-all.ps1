# Script para iniciar MongoDB y luego el Backend
# Ejecutar con PowerShell

Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "       Iniciando MongoDB y Backend" -ForegroundColor Green
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Paso 1: Crear directorio de datos de MongoDB
$dataPath = "C:\data\db"
$logPath = "C:\data\logs"

if (!(Test-Path $dataPath)) {
    Write-Host ""
    Write-Host "📁 Creando directorio de datos: $dataPath" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $dataPath -Force | Out-Null
    Write-Host "✅ Directorio creado" -ForegroundColor Green
}

if (!(Test-Path $logPath)) {
    New-Item -ItemType Directory -Path $logPath -Force | Out-Null
}

# Paso 2: Verificar si MongoDB está instalado
$mongoPath = "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
$mongodExists = Test-Path $mongoPath

Write-Host ""
if ($mongodExists) {
    Write-Host "✅ MongoDB encontrado en: $mongoPath" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "🚀 Iniciando MongoDB..." -ForegroundColor Yellow
    
    # Iniciar MongoDB en background
    $mongoProccess = Start-Process -FilePath $mongoPath -ArgumentList "--dbpath `"$dataPath`"" -PassThru -WindowStyle Minimized
    
    Write-Host "✅ MongoDB iniciado (PID: $($mongoProccess.Id))" -ForegroundColor Green
    Write-Host "   Listening on: mongodb://localhost:27017" -ForegroundColor Cyan
    
    # Esperar a que MongoDB esté listo
    Write-Host ""
    Write-Host "⏳ Esperando a que MongoDB esté listo (5 segundos)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    
} else {
    Write-Host "⚠️  MongoDB no está instalado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Para instalar MongoDB, ejecuta:" -ForegroundColor Cyan
    Write-Host "  .\install-mongodb.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "O descárgalo manualmente de:" -ForegroundColor Yellow
    Write-Host "  https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host ""
}

# Paso 3: Iniciar el Backend
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "       BACKEND" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

Write-Host "Current Location: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Verificar que exista node_modules
if (!(Test-Path "node_modules")) {
    Write-Host "📥 Instalando dependencias del backend (npm install)..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🚀 Iniciando servidor Express en puerto 5000..." -ForegroundColor Yellow
Write-Host ""
npm run dev
