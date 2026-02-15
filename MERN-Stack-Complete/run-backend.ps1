# Script para iniciar el servidor backend
Set-Location $PSScriptRoot
Set-Location backend
Write-Host "Iniciando servidor backend en puerto 5000..." -ForegroundColor Green
Write-Host "Ubicación: $(Get-Location)" -ForegroundColor Cyan
npm run dev
