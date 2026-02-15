# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

# Copiar configuración nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar dist desde builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Crear usuario nginx
RUN addgroup -g 1001 nginx && \
    adduser -S -u 1001 nginx

USER nginx

# Exponer puerto
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
