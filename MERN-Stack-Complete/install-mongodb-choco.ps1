# Script para instalar MongoDB con Chocolatey (MÁS FÁCIL)
# Ejecutar como Administrador

Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Verificando instalación de Chocolatey" -ForegroundColor Green
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Paso 1: Instalar Chocolatey si no existe
Write-Host ""
$chocoPath = "C:\ProgramData\chocolatey\choco.exe"
if (!(Test-Path $chocoPath)) {
    Write-Host "⚙️  Instalando Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    Write-Host "✅ Chocolatey instalado" -ForegroundColor Green
} else {
    Write-Host "✅ Chocolatey ya existe" -ForegroundColor Green
}

# Paso 2: Instalar MongoDB con Chocolatey
Write-Host ""
Write-Host "📥 Instalando MongoDB..." -ForegroundColor Yellow
choco install mongodb-community -y

Write-Host ""
Write-Host "✅ MongoDB instalado exitosamente" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar MongoDB después:" -ForegroundColor Cyan
Write-Host "  mongod" -ForegroundColor White
Write-Host ""
Write-Host "O iniciar como servicio:" -ForegroundColor Cyan
Write-Host "  net start MongoDB" -ForegroundColor White
Write-Host ""
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
