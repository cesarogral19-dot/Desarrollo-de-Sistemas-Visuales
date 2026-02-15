const router = require('express').Router()
const { body } = require('express-validator')
const { authMiddleware } = require('../middlewares/auth')
const { role } = require('../middlewares/role')
const { validate } = require('../middlewares/validateRequest')
const reqCtrl = require('../controllers/requestController')

// POST /api/requests — validación server-side (coincide con client)
router.post('/', [
  authMiddleware,
  body('title').notEmpty().withMessage('Título requerido'),
  body('description').isLength({ min: 10 }).withMessage('Descripción mínima 10 caracteres'),
  body('amount').isFloat({ gt: 0, lt: 10001 }).withMessage('Monto debe ser entre 1 y 10,000')
], validate, reqCtrl.create)

router.get('/', authMiddleware, reqCtrl.list)

// PATCH para que MANAGER/ADMIN puedan aprobar / cerrar solicitudes
router.patch('/:id/approve', authMiddleware, role(['ADMIN','MANAGER']), reqCtrl.approve)

router.put('/:id', authMiddleware, role(['ADMIN','MANAGER']), reqCtrl.update)
router.delete('/:id', authMiddleware, role(['ADMIN','MANAGER']), reqCtrl.remove)

module.exports = router
