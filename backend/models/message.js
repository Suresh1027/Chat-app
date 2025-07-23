const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)