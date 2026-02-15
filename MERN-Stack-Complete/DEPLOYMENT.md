# 🚀 Guía de Desplegamiento

Instrucciones para desplegar tu aplicación MERN a producción.

## Opciones de Desplegamiento

### 1. 🌩️ AWS (Recomendado para Producción)

#### EC2 + Docker
```bash
# 1. Lanzar instancia EC2 (Ubuntu 22.04 LTS)

# 2. SSH a tu instancia
ssh -i tu-key.pem ubuntu@tu-ip-publica

# 3. Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# 4. Clonar tu repositorio
git clone https://github.com/tu-usuario/MERN-Stack.git
cd MERN-Stack

# 5. Crear .env con variables de producción
nano .env

# 6. Iniciar con Docker Compose
docker-compose up -d

# 7. Configurar dominio (Route 53)
# - Apuntar tu dominio a la IP elástica de EC2
```

#### RDS para MongoDB
```bash
# En lugar de MongoDB local, usa MongoDB Atlas (MongoDB as a Service)
# O usa RDS con MongoDB

# Actualizar MONGODB_URI en .env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
```

---

### 2. 🔥 Firebase + Vercel (Rápido y Fácil)

#### Frontend en Vercel
```bash
# 1. Instala Vercel CLI
npm i -g vercel

# 2. Navega a frontend
cd frontend

# 3. Despliega
vercel

# 4. Configura variables de entorno
# - VITE_API_BASE_URL=https://tu-api.com/api
```

#### Backend en Firebase
```bash
# 1. Instala Firebase CLI
npm i -g firebase-tools
firebase login

# 2. En carpeta backend
firebase init functions

# 3. Configura tu backend en Functions
# Sigue docs de Firebase Cloud Functions
```

---

### 3. ☁️ Heroku (Gratuito/Bajo Costo)

#### Desplegar Backend
```bash
# 1. Instala Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# 2. Login
heroku login

# 3. Crea app
heroku create mi-app-mern-backend

# 4. Agrega MongoDB Atlas
heroku addons:create mongolab:sandbox

# 5. Configura variables
heroku config:set JWT_SECRET=tu_secret_key
heroku config:set NODE_ENV=production

# 6. Deploy
git push heroku main
```

#### Desplegar Frontend
```bash
# Similar a Vercel
npm run build
# Subir la carpeta dist a Netlify o Vercel
```

---

### 4. 🐳 DigitalOcean (Excelente relación precio-rendimiento)

#### App Platform
```bash
# 1. Push a GitHub

# 2. En DigitalOcean App Platform:
# - Conecta tu repositorio
# - Configura:
#   - Frontend: Build: `npm run build`, Output: `dist`
#   - Backend: Build: `npm install`, Run: `npm start`

# 3. Configura variables de entorno
# - MONGODB_URI
# - JWT_SECRET
# - CORS_ORIGIN=https://tu-dominio.com

# 4. Deploy automático con cada push
```

#### Con Docker
```bash
# Usa DigitalOcean App Platform con Docker Compose
# O crea un Droplet y usa Docker directamente
```

---

### 5. 🏠 Servidor Propio (VPS)

```bash
# 1. Compra un VPS (Namecheap, Linode, etc.)

# 2. Conecta vía SSH
ssh root@tu-ip

# 3. Instala herramientas necesarias
apt update && apt upgrade -y
apt install -y git docker.io docker-compose npm

# 4. Clon del proyecto
git clone https://github.com/tu-usuario/MERN-Stack.git
cd MERN-Stack

# 5. Configura .env
nano .env

# 6. Inicia servicios
docker-compose up -d

# 7. Configura Nginx como reverse proxy
# Ver sección "Nginx Proxy" abajo
```

---

## 🔒 Checklist de Seguridad

Antes de publicar, verifica:

### Backend
- [ ] `JWT_SECRET` cambiad
- [ ] `MONGODB_URI` apunta a Atlas con contraseña
- [ ] `CORS_ORIGIN` es específico (no `*`)
- [ ] `NODE_ENV=production`
- [ ] Deshabilitad logs de debug
- [ ] Rate limiting habilitad
- [ ] HTTPS habilitad
- [ ] Helmet instalado (ya está)
- [ ] Variables sensibles en `.env` (no en código)

### Frontend
- [ ] `VITE_API_BASE_URL` apunta a API de producción
- [ ] Quitar console.log de debug
- [ ] Build optimizado (`npm run build`)
- [ ] No incluir archivos sensibles

### General
- [ ] Certificado SSL/HTTPS
- [ ] Backups de MongoDB
- [ ] Logs centralizados
- [ ] Monitoreo configurado
- [ ] Domain DNS apuntando correctamente

---

## 📊 Monitoreo y Logs

### CloudWatch (AWS)
```bash
# Los logs se capturan automáticamente en CloudWatch
# Ver en AWS Console > CloudWatch
```

### Datadog (Recomendado)
```bash
# 1. Instala agent en tu servidor
DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"

# 2. Configura para Docker
docker-compose config # verifica logs
```

### ELK Stack (Local)
```bash
# Docker Compose para Elasticsearch, Logstash, Kibana
# Ver docs en elastic.co
```

---

## 🔄 CI/CD con GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to DigitalOcean
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          
          ssh -i ~/.ssh/deploy_key root@${{ secrets.SERVER_IP }} << 'EOF'
          cd /app/MERN-Stack
          git pull origin main
          docker-compose down
          docker-compose up -d
          EOF
```

---

## 🌐 Nginx Proxy

Para servidor propio, configura Nginx:

```nginx
# /etc/nginx/sites-available/default

upstream backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name tu-dominio.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tu-dominio.com;

    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilita el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔐 SSL/HTTPS con Let's Encrypt

```bash
# Instala Certbot
sudo apt install certbot python3-certbot-nginx

# Obtén certificado
sudo certbot certonly --nginx -d tu-dominio.com

# Renovación automática
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## 📈 Escalabilidad

### Múltiples instancias
```bash
# Load Balancer (AWS ELB, DigitalOcean LB)
# Apunta múltiples EC2 instances
```

### Cache con Redis
```javascript
// backend/src/config/redis.js
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});
```

### CDN (CloudFront, CloudFlare)
```bash
# Configura CDN para servir assets estáticos
# Reduce latencia y costo de ancho de banda
```

---

## 📊 Costos Estimados (Mensual)

| Plataforma | Servidor | BD | CDN | Total |
|-----------|----------|----|----|-------|
| **DigitalOcean** | $5 | $15 | - | $20 |
| **AWS** | $10 | $15 | $5 | $30 |
| **Heroku** | $50 | Incl | - | $50 |
| **Vercel + Firebase** | Free | $10 | Free | $10 |
| **VPS Namecheap** | $5 | $10 | - | $15 |

---

## 🚨 Post-Deploy

Después de desplegar, verifica:

```bash
# 1. API health
curl https://tu-api.com/api/health

# 2. Frontend carga
curl https://tu-dominio.com

# 3. Logs de error
# Check en tu servicio de logs

# 4. Monitoreo
# Setup alertas en Datadog, NewRelic, etc.
```

---

## 📞 Soporte de Plataforma

- **DigitalOcean**: https://docs.digitalocean.com/
- **AWS**: https://aws.amazon.com/getting-started/
- **Vercel**: https://vercel.com/docs
- **Heroku**: https://devcenter.heroku.com/
- **Firebase**: https://firebase.google.com/docs/

---

**Tu app está lista para el mundo! 🌍**
