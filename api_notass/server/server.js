const express = require('express')
const path = require('path')
const cors = require('cors')
const notasRoutes = require('./routes/notas')

const app = express()

// Usar variable de entorno PORT si existe
const PORT = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// registro simple de peticiones
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
  next()
})

// Rutas
app.use('/api/notas', notasRoutes)

// Servir index si lo necesitas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Iniciar servidor en PORT
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`)
})
