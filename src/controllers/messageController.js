import Message from '../models/index'

exports.getSecret = async (req, res) => {
    const messages = await Message.find();
    res.status(200).json({
        Results: messages.length,
        data: { messages }
    })
}

exports.createSecret = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json({
            message: 'Secret created successful',
            data: { message }
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
