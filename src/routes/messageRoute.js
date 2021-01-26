import express from 'express'
import messageController from '../controllers/messageController'
const router = express.Router()

router
    .route('/')
    .get(messageController.getSecret)
    .post(messageController.createSecret)

export default router
