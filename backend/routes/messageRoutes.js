const express = require('express')
const { sendMessage, getMessage } = require('../controllers/messageController')
const authmiddileware = require('../middileware/authmiddileware')
const router = express.Router()

router.post('/sender', authmiddileware, sendMessage)
router.get('/getmessage', authmiddileware, getMessage)

module.exports = router