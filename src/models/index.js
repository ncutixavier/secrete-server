import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    secret: {
        type: String,
        required: [true, 'A Message must have a secrete'],
        trim: true,
        unique: true
    },

    expireAfterViews: {
        type: Number,
        required: [true, 'message must have limited views']
    },

    expireAfter: {
        type: Date,
        default: new Date(),
        required: [true, 'message must have a expire date']
    },

    createdAt: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema)

export default Message
