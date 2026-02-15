const router = require('express').Router()
const crepaController = require('../controllers/crepaController')

router.get('/', crepaController.getAll)
router.post('/', crepaController.create)
router.put('/:id', crepaController.update)
router.delete('/:id', crepaController.delete)

module.exports = router
