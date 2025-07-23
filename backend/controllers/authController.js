const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields are required" })
        }

        const existUser = await User.findOne({ email })
        if (existUser) {
            res.status(400).json({ message: "this user already exist" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedpassword
        })

        await newUser.save();
        res.status(200).json({ message: "User register successfully" })
    } catch (error) {
        res.status(400).json({ message: "server error", error })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "invalid user" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({ message: "invalid password" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ user: { id: user._id, username: user.username }, token })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}