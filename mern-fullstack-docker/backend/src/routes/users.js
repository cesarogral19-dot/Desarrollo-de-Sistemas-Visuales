const router = require('express').Router()
const { authMiddleware } = require('../middlewares/auth')
const { role } = require('../middlewares/role')
const userCtrl = require('../controllers/userController')

router.get('/', authMiddleware, role(['ADMIN']), userCtrl.listUsers)
router.put('/:id', authMiddleware, role(['ADMIN']), userCtrl.updateUser)

module.exports = router
