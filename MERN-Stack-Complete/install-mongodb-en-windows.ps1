# Script de Instalacion de MongoDB para Windows PowerShell
# Este script te ayuda a elegir e instalar la mejor opcion de MongoDB para tu proyecto

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "                  INSTALACION DE MONGODB" -ForegroundColor Green
Write-Host "                   Para Proyecto MERN Stack" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Explicar el error anterior
Write-Host "INFO IMPORTANTE:" -ForegroundColor Yellow
Write-Host "El simbolo '$' que ves en tutoriales es parte de la documentacion de Bash (Linux/Mac)"
Write-Host "En PowerShell en Windows, NO usas el '$' al escribir comandos."
Write-Host ""
Write-Host "INCORRECTO: $ brew install mongodb-atlas" -ForegroundColor Red
Write-Host "CORRECTO:   brew install mongodb-atlas" -ForegroundColor Green
Write-Host ""

# Menu de opciones
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "ELIGE UNA OPCION:" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1 - MongoDB Community Edition LOCAL (Recomendado para desarrollo)" -ForegroundColor Yellow
Write-Host "    - Instala MongoDB localmente en tu PC" -ForegroundColor Cyan
Write-Host "    - No necesita internet despues de instalar" -ForegroundColor Cyan
Write-Host "    - Mas rapido que cloud" -ForegroundColor Cyan
Write-Host "    - Perfecto para aprender MERN" -ForegroundColor Cyan
Write-Host ""

Write-Host "2 - MongoDB Atlas (Cloud - Sin instalacion)" -ForegroundColor Yellow
Write-Host "    - Base de datos en la nube (gratis 512MB)" -ForegroundColor Cyan
Write-Host "    - No necesita instalar nada localmente" -ForegroundColor Cyan
Write-Host "    - Accesible desde cualquier lado" -ForegroundColor Cyan
Write-Host "    - Perfecto si viajas o no quieres instalar" -ForegroundColor Cyan
Write-Host ""

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Que opcion prefieres? (escribe: 1 o 2)"

Write-Host ""

# OPCION 1: MongoDB Community Edition Local
if ($choice -eq "1") {
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host "INSTALANDO: MongoDB Community Edition Local" -ForegroundColor Green
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "Estos son los pasos:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "PASO 1: Descargar MongoDB" -ForegroundColor Cyan
    Write-Host "  - Abre tu navegador" -ForegroundColor White
    Write-Host "  - Ve a: https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host "  - Selecciona:" -ForegroundColor White
    Write-Host "    * Platform: Windows" -ForegroundColor White
    Write-Host "    * Version: 6.0 Community Edition" -ForegroundColor White
    Write-Host "    * Package: MSI" -ForegroundColor White
    Write-Host "  - Haz clic en Download" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 2: Ejecutar el instalador" -ForegroundColor Cyan
    Write-Host "  - Abre tu carpeta de Descargas" -ForegroundColor White
    Write-Host "  - Busca: mongodb-windows-x86_64-6.0.x-signed.msi" -ForegroundColor White
    Write-Host "  - Haz doble clic" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 3: Seguir el instalador" -ForegroundColor Cyan
    Write-Host "  - Selecciona: Install MongoDB as a Windows Service" -ForegroundColor White
    Write-Host "  - Haz clic en: Next -> Next -> Finish" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 4: Verificacion" -ForegroundColor Cyan
    Write-Host "  - MongoDB se inicia automaticamente" -ForegroundColor White
    Write-Host "  - Para verificar que funciona, ejecuta en PowerShell:" -ForegroundColor White
    Write-Host "    mongod --version" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "PASO 5: Ejecutar el proyecto" -ForegroundColor Cyan
    Write-Host "  - Vuelve a la carpeta MERN-Stack-Complete" -ForegroundColor White
    Write-Host "  - Haz doble clic en: START-ALL.bat" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Quieres que abra el navegador ahora?" -ForegroundColor Yellow
    $openBrowser = Read-Host "Escribe: si o no"
    
    if ($openBrowser -eq "si") {
        Start-Process "https://www.mongodb.com/try/download/community"
        Write-Host ""
        Write-Host "Navegador abierto. Ve descargando MongoDB." -ForegroundColor Green
    }
}

# OPCION 2: MongoDB Atlas Cloud
elseif ($choice -eq "2") {
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host "INSTALANDO: MongoDB Atlas (Cloud)" -ForegroundColor Green
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "Estos son los pasos:" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "PASO 1: Crear cuenta en MongoDB Atlas" -ForegroundColor Cyan
    Write-Host "  - Ve a: https://www.mongodb.com/cloud/atlas" -ForegroundColor White
    Write-Host "  - Haz clic en: Sign Up" -ForegroundColor White
    Write-Host "  - Completa el formulario" -ForegroundColor White
    Write-Host "  - Verifica tu email" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 2: Crear un Cluster" -ForegroundColor Cyan
    Write-Host "  - Despues de login, haz clic en: Create a Deployment" -ForegroundColor White
    Write-Host "  - Elige: Free (es gratis)" -ForegroundColor White
    Write-Host "  - Region: American (closest to you)" -ForegroundColor White
    Write-Host "  - Haz clic en: Create Cluster" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 3: Configurar acceso" -ForegroundColor Cyan
    Write-Host "  - Ve a: Security -> Database Access" -ForegroundColor White
    Write-Host "  - Crea un nuevo usuario MongoDB:" -ForegroundColor White
    Write-Host "    * Username: mernuser" -ForegroundColor White
    Write-Host "    * Password: (apunta una contraseña segura)" -ForegroundColor White
    Write-Host "  - Guarda el usuario y contraseña" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 4: Obtener Connection String" -ForegroundColor Cyan
    Write-Host "  - Ve a: Databases -> Connect -> Drivers" -ForegroundColor White
    Write-Host "  - Copia la connection string" -ForegroundColor White
    Write-Host "  - Vera algo como:" -ForegroundColor White
    Write-Host "    mongodb+srv://mernuser:PASSWORD@cluster.mongodb.net/mern_db" -ForegroundColor White
    Write-Host "  - Reemplaza PASSWORD con tu contraseña" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 5: Configurar en tu proyecto" -ForegroundColor Cyan
    Write-Host "  - Abre: backend/.env" -ForegroundColor White
    Write-Host "  - Encuentra la linea: MONGODB_URL=" -ForegroundColor White
    Write-Host "  - Reemplazala con tu connection string" -ForegroundColor White
    Write-Host ""
    
    Write-Host "PASO 6: Ejecutar el proyecto" -ForegroundColor Cyan
    Write-Host "  - Vuelve a la carpeta MERN-Stack-Complete" -ForegroundColor White
    Write-Host "  - Haz doble clic en: START-ALL.bat" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Ventajas de usar MongoDB Atlas:" -ForegroundColor Green
    Write-Host "  - No necesita instalacion local" -ForegroundColor White
    Write-Host "  - Accesible desde cualquier lugar" -ForegroundColor White
    Write-Host "  - Gratis hasta 512MB" -ForegroundColor White
    Write-Host "  - Perfecto para aprender y hacer demos" -ForegroundColor White
    Write-Host ""
    
    Write-Host "Quieres que abra MongoDB Atlas ahora?" -ForegroundColor Yellow
    $openAtlas = Read-Host "Escribe: si o no"
    
    if ($openAtlas -eq "si") {
        Start-Process "https://www.mongodb.com/cloud/atlas"
        Write-Host ""
        Write-Host "Navegador abierto. Ve creando tu cuenta y cluster." -ForegroundColor Green
    }
}

else {
    Write-Host "Opcion no valida. Por favor ejecuta de nuevo." -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Cuando termines, ejecuta: START-ALL.bat" -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
