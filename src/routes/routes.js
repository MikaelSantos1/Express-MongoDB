const {Router}= require('express')
const router =  Router()
const RegisterController = require('../app/controllers/authController')
const projectController = require('../app/controllers/projectController')
const authMiddleware = require('../app/middlewares/auth')


router.post('/auth/register',RegisterController.store)
router.post('/auth/authenticate',RegisterController.authenticate)

router.get('/project',authMiddleware,projectController.show)
router.get('/project/:projectId',authMiddleware,projectController.index)
router.post('/project',authMiddleware,projectController.store)
router.put('/project/:projectId',authMiddleware,projectController.update)
router.delete('/project/:projectId',authMiddleware,projectController.delete)

module.exports = router