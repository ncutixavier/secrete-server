import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    secret: {
        type: String,
        required: [true, 'A Message must have a secrete'],
        trim: true
    },

    hash: {
        type: String
    },

    expireAfterViews: {
        type: Number,
        required: [true, 'message must have limited views']
    },

    expireAfter: {
        type: Number,
        required: [true, 'message must have a expire time']
    },

    createdAt: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema)

export default Message
