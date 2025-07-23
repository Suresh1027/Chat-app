const Message = require('../models/message')

exports.sendMessage = async (req, res) => {
    try {
        const { text } = req.body
        const sender = req.user.id

        const message = new Message({ text, sender })
        await message.save()

        res.status(201).json(message)
    } catch (error) {
        res.status(401).json({ message: "message failed to send" })
    }
}

exports.getMessage = async (req, res) => {
    try {
        const messages = await Message.find().populate("sender", "username")
        res.json(messages)
    } catch (error) {
        res.status(401).json({ message: "fetched unsuccessfull" })
    }
}