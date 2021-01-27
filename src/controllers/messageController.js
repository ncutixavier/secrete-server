import Message from '../models/index'
import hashAnything from 'hash-anything'
const sha256 = hashAnything.sha256

exports.getSecret = async (req, res) => {

    const messages = await Message.find();
    return res.status(200).json({
        results: messages.length,
        data: { messages }
    })
}

exports.createSecret = async (req, res) => {
    try {
        const { secret, expireAfterViews, expireAfter } = req.body
        const hash = sha256(req.body.secret)
        
        const currentMinute = new Date().getMinutes()
        const expireMinute = currentMinute + expireAfter

        const message = await Message.create({
            secret,
            expireAfterViews,
            expireAfter: expireMinute,
            hash
        });

        return res.status(201).json({
            message: 'Secret created successful',
            data: { message }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while creating message"
        })
    }
}

exports.getSecretById = async (req, res) => {
    try {
        const minute = new Date().getMinutes()
        const message = await Message.findOne({
            hash: req.params.hash
        })

        if (minute > message.expireAfter) {
            return res.status(404).json({
                message: 'Your secret has been expired'
            })
        }

        return res.status(200).json({ message })
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while retrieving message"
        })
    }
}
