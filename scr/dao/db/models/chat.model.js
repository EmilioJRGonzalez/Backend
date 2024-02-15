const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    messages: {
        type: String
    }
}, { versionKey: false })

const Chat = mongoose.model('chats', ChatSchema)

module.exports = Chat