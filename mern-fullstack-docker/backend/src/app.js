require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const requestRoutes = require('./routes/requests')
const pdfRoutes = require('./routes/pdf')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));

// routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/pdf', pdfRoutes)

// simple health check endpoint
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve frontend build and provide SPA fallback in production to avoid 404 on client routes
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), 'frontend', 'dist')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'index.html'))
	})
}

// error handler
app.use(errorHandler)

module.exports = app
