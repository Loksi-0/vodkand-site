import Router from 'express'
import wikiController from '../controllers/wikiController.js'
import authController from '../controllers/authController.js'
import openIDController from '../controllers/openIDController.js'
import { body } from 'express-validator'
import minecraftAPIController from '../controllers/minecraftAPIController.js'

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
router.post('/googleauth', authController.googleAuth)
router.post('/sendmail', authController.sendMail)
router.put('/nickname', authController.changeNickname)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.get('/user', authController.hasUser)

router.get('/google/url', openIDController.redirect)
router.post('/auth/google/callback', openIDController.handleCode)

router.get('/minecraftapi/punishments', minecraftAPIController.getPlayerPunishments)
router.get('/minecraftapi/whitelist', minecraftAPIController.getWhitelist)
router.post('/minecraftapi/whitelist', minecraftAPIController.postWhitelist)

export default router