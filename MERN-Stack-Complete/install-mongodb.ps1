# Script para instalar MongoDB Community Edition en Windows
# Ejecutar como Administrador

Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Instalando MongoDB Community Edition" -ForegroundColor Green
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Verificar si MongoDB ya está instalado
$mongoPath = "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
if (Test-Path $mongoPath) {
    Write-Host "✅ MongoDB ya está instalado en: $mongoPath" -ForegroundColor Green
    exit 0
}

# Descargar MongoDB Community Edition
Write-Host ""
Write-Host "📥 Descargando MongoDB Community 6.0..." -ForegroundColor Yellow
$mongoUrl = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.0-signed.msi"
$mongoMsi = "$env:TEMP\mongodb-installer.msi"

# Usar WebClient para descargar (más compatible)
try {
    $client = New-Object System.Net.WebClient
    $client.DownloadFile($mongoUrl, $mongoMsi)
    Write-Host "✅ Descarga completada" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al descargar MongoDB" -ForegroundColor Red
    Write-Host "Descárgalo manualmente de: $mongoUrl" -ForegroundColor Yellow
    exit 1
}

# Instalar MongoDB
Write-Host ""
Write-Host "⚙️  Ejecutando instalador..." -ForegroundColor Yellow
Start-Process -FilePath "msiexec" -ArgumentList "/i `"$mongoMsi`" /quiet /qn /norestart" -Wait

# Verificar instalación
if (Test-Path $mongoPath) {
    Write-Host "✅ MongoDB instalado exitosamente" -ForegroundColor Green
    
    # Iniciar servicio MongoDB
    Write-Host ""
    Write-Host "🚀 Iniciando servicio MongoDB..." -ForegroundColor Yellow
    Get-Service MongoDB -ErrorAction SilentlyContinue | Start-Service
    
    # Crear directorio de datos
    $dataPath = "C:\data\db"
    if (!(Test-Path $dataPath)) {
        New-Item -ItemType Directory -Path $dataPath -Force | Out-Null
        Write-Host "✅ Directorio de datos creado: $dataPath" -ForegroundColor Green
    }
    
    # Iniciar MongoDB
    cmd /c "mongod --dbpath $dataPath" &
    
    Write-Host ""
    Write-Host "✅ MongoDB está corriendo en localhost:27017" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para detener MongoDB:" -ForegroundColor Cyan
    Write-Host "  net stop MongoDB" -ForegroundColor White
    Write-Host ""
    Write-Host "Para iniciar MongoDB:" -ForegroundColor Cyan
    Write-Host "  net start MongoDB" -ForegroundColor White
    
} else {
    Write-Host "❌ MongoDB no se instaló correctamente" -ForegroundColor Red
}

# Limpiar archivo instalador
Remove-Item $mongoMsi -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
