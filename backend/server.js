const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const authRoutes = require("../backend/routes/authRoutes")
const messageRoutes = require("../backend/routes/messageRoutes")
const app = express()

app.use(cors())
app.use(express.json())


connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

const PORT = 5000;
app.listen(PORT, () => console.log(`server is rinning at: ${PORT}`))