import express from 'express'
import messageController from '../controllers/messageController'
import middleware from '../middleware/index'
const router = express.Router()

router
    .route('/')
    .get(messageController.getSecret)
    .post(messageController.createSecret)

router
    .route('/:hash')
    .get(middleware.limitedViews, messageController.getSecretById)

export default router
