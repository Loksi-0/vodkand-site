import Router from 'express'
import wikiController from '../controllers/wikiController.js'
import authController from '../controllers/authController.js'
import { body } from 'express-validator'

const router = new Router()

router.get('/plugins', wikiController.get)
router.get('/terms', wikiController.get)
router.get('/rules', wikiController.get)

router.post('/registration', 
    body('email').trim().isEmail(), 
    body('password').trim().notEmpty().isLength({ min: 6, max: 32 }),
    authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/sendmail', authController.sendMail)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.get('/users', authController.getUsers)

export default router