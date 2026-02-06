import Router from 'express'
import wikiController from '../controllers/wiki/wikiController.js'
import authController from '../controllers/auth/authController.js'
import openIDController from '../controllers/openID/openIDController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { body } from 'express-validator'
import minecraftAPIController from '../controllers/minecraftAPI/minecraftAPIController.js'
import paymentController from '../controllers/payment/paymentController.js'
import uploadsController from '../controllers/uploads/uploadsController.js'
import productsController from '../controllers/products/productsController.js'

const router = Router()

router.get('/wiki/:chapter', wikiController.navigation)
router.get('/wiki/:chapter/:page', wikiController.get)

router.post(
  '/auth/registration',
  body('email').trim().isEmail(),
  body('password').trim().notEmpty().isLength({ min: 6, max: 32 }),
  authController.registration
)
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
router.get('/gallery/:page', uploadsController.getGallery)

router.get('/google/url', openIDController.redirect)
router.get('/auth/google/callback', openIDController.handleCode)

router.get(
  '/minecraftapi/punishments',
  AuthMiddleware,
  minecraftAPIController.getPlayerPunishments
)
router.get(
  '/minecraftapi/whitelist',
  AuthMiddleware,
  minecraftAPIController.getWhitelist
)
router.post(
  '/minecraftapi/whitelist',
  AuthMiddleware,
  minecraftAPIController.postWhitelist
)

router.post('/payment/create', AuthMiddleware, paymentController.createOrder)
router.post('/payment/notification', paymentController.handleNotification)

router.get('/products', productsController.getAll)
router.get('/products/:slug', productsController.getOne)

export default router
