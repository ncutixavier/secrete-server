import express from 'express'
import messageRoute from './messageRoute'

const router = express()

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Secrete Server API'
    })
})

router.use('/api/secret', messageRoute)

router.all('*', (req, res) => {
    res.status(404).json({
        message: 'URL NOT FOUND'
    })
})

export default router
