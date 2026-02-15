# Script para iniciar el servidor frontend
Set-Location $PSScriptRoot
Set-Location frontend
Write-Host "Instalando dependencias del frontend..." -ForegroundColor Green
npm install
Write-Host "Iniciando servidor frontend en puerto 5173..." -ForegroundColor Green
Write-Host "Ubicación: $(Get-Location)" -ForegroundColor Cyan
npm run dev
