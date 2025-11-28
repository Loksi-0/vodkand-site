import Router from 'express'
import pluginsController from './plugins/pluginsController.js'

const router = new Router()

router.get('/plugins', pluginsController.get)

export default router