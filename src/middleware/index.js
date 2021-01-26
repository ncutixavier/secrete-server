import Message from '../models/index'

exports.limitedViews = async (req, res, next) => {
    const message = await Message.findOne({
        hash: req.params.hash
    })
    const expireAfterViews = message.expireAfterViews - 1

    await Message.findByIdAndUpdate(message._id, {
        expireAfterViews
    })

    if (message.expireAfterViews < 1) {
        return res.status(404).json({
            message: 'Limited views has been reached'
        })
    }
    next()
}
