const router = require('express').Router()
const { body } = require('express-validator')
const authCtrl = require('../controllers/authController')
const { authMiddleware } = require('../middlewares/auth')

router.post('/register', [ body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }) ], authCtrl.register)
router.post('/login', authCtrl.login)
router.get('/me', authMiddleware, authCtrl.me)
router.post('/logout', authCtrl.logout)

module.exports = router
