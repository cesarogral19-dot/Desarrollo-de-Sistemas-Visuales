/**
 * Servidor Principal
 * Configuración de Express y middlewares
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import 'dotenv/config.js';
import { connectDB } from './config/database.js';
import { errorHandler } from './middlewares/validation.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import solicitudRoutes from './routes/solicitudRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ==================
// MIDDLEWARES GLOBALES
// ==================

// Seguridad
app.use(helmet());

// CORS
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const corsOptions = {
  origin: corsOrigin === 'http://localhost:3000' 
    ? /^http:\/\/localhost:\d+$/ // Allow any localhost port in development
    : corsOrigin,
  credentials: true,
};
app.use(cors(corsOptions));

// Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Logger
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests por ventana
});
app.use('/api/', limiter);

// ==================
// RUTAS API
// ==================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend en línea',
    timestamp: new Date().toISOString(),
  });
});

// Autenticación
app.use('/api/auth', authRoutes);

// Solicitudes
app.use('/api/solicitudes', solicitudRoutes);

// Usuarios
app.use('/api/users', userRoutes);

// Reportes
app.use('/api/reports', reportRoutes);

// ==================
// RUTAS NO ENCONTRADAS / FALLBACK SPA
// ==================

// En producción servimos el frontend construido y damos fallback a index.html
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'index.html'));
  });
} else {
  // En desarrollo devolvemos 404 para rutas desconocidas del API
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Ruta no encontrada',
    });
  });
}

// ==================
// MANEJO DE ERRORES
// ==================

app.use(errorHandler);

// ==================
// INICIAR SERVIDOR
// ==================

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('✗ Error al iniciar servidor:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
