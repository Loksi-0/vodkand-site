import Router from 'express'
import wikiController from '../controllers/wikiController.js'
import authController from '../controllers/authController.js'
import openIDController from '../controllers/openIDController.js'
import { body } from 'express-validator'
import minecraftAPIController from '../controllers/minecraftAPIController.js'

const router = new Router()

router.get('/wiki/:chapter', wikiController.navigation)
router.get('/wiki/:chapter/:page', wikiController.get)

router.post('/auth/registration', 
    body('email').trim().isEmail(), 
    body('password').trim().notEmpty().isLength({ min: 6, max: 32 }),
    authController.registration)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)
router.post('/auth/googleauth', authController.googleAuth)
router.post('/sendmail', authController.sendMail)
router.put('/auth/nickname', authController.changeNickname)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.get('/user', authController.hasUser)

router.get('/google/url', openIDController.redirect)
router.get('/auth/google/callback', openIDController.handleCode)

router.get('/minecraftapi/punishments', minecraftAPIController.getPlayerPunishments)
router.get('/minecraftapi/whitelist', minecraftAPIController.getWhitelist)
router.post('/minecraftapi/whitelist', minecraftAPIController.postWhitelist)

export default router