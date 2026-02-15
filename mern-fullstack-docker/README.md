# MERN Fullstack (Dockerized)

Plantilla completa MERN (MongoDB, Express, React, Node) preparada para desarrollo y despliegue con Docker.

Características principales:
- Frontend: React + Vite, rutas con React Router, Context API, validaciones, guardado de borradores en localStorage.
- Backend: Node.js + Express + Mongoose, JWT en cookie, roles (ADMIN, MANAGER, USER, SUPPORT), validación con express-validator.
- PDF generation en backend (PDFKit).
- Contenedores con Docker (frontend, backend, mongodb) y `docker-compose`.

Quickstart (con Docker)
1. Copiar `.env.example` a `.env` en `backend/` y `frontend/` y ajustar valores.
2. Ejecutar: `docker-compose up --build`
3. Frontend: http://localhost:3001 — Backend API: http://localhost:5000/api

Modo desarrollo (local)
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm run dev`

Tests
- Backend (Jest + Supertest): `cd backend && npm test`
- Frontend (Vitest): `cd frontend && npm test` (unit tests for validation are included)

---
Consejos:
- `JWT_SECRET` y `MONGO_URI` deben configurarse en `backend/.env`.
- El servicio `frontend` usa `VITE_API_URL` para apuntar a la API.

