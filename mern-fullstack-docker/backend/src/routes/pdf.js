const router = require('express').Router()
const { authMiddleware } = require('../middlewares/auth')
const pdfCtrl = require('../controllers/pdfController')

router.get('/export', authMiddleware, pdfCtrl.exportRequests)

module.exports = router
