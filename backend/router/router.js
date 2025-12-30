import Router from 'express'
import wikiController from '../controllers/wikiController.js'
import authController from '../controllers/authController.js'
import openIDController from '../controllers/openIDController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { body } from 'express-validator'
import minecraftAPIController from '../controllers/minecraftAPIController.js'
import paymentController from '../controllers/paymentController.js'

const router = new Router()

router.get('/wiki/:chapter', wikiController.navigation)
router.get('/wiki/:chapter/:page', wikiController.get)

router.post('/auth/registration', 
    body('email').trim().isEmail(), 
    body('password').trim().notEmpty().isLength({ min: 6, max: 32 }),
    authController.registration)
router.post('/auth/login', authController.login)
router.post('/auth/logout', AuthMiddleware, authController.logout)
router.post('/auth/googleauth', authController.googleAuth)
router.post('/sendmail', AuthMiddleware, authController.sendMail)
router.post('/agree', AuthMiddleware, authController.agree)
router.put('/auth/nickname', AuthMiddleware, authController.changeNickname)
router.get('/activate/:link', AuthMiddleware, authController.activate)
router.get('/refresh', authController.refresh)
router.get('/user', authController.hasUser)
router.get('/me', AuthMiddleware, authController.me)

router.get('/google/url', openIDController.redirect)
router.get('/auth/google/callback', openIDController.handleCode)

router.get('/minecraftapi/punishments', AuthMiddleware, minecraftAPIController.getPlayerPunishments)
router.get('/minecraftapi/whitelist', AuthMiddleware, minecraftAPIController.getWhitelist)
router.post('/minecraftapi/whitelist', AuthMiddleware, minecraftAPIController.postWhitelist)

router.post('/payment/create', AuthMiddleware, paymentController.createOrder)
router.post('/payment/notification', paymentController.handleNotification)

export default router