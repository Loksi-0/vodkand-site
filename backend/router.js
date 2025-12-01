import Router from 'express'
import wikiController from './wiki/wikiController.js'

const router = new Router()

router.get('/plugins', wikiController.get)
router.get('/terms', wikiController.get)
router.get('/rules', wikiController.get)

export default router