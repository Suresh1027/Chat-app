const jwt = require('jsonwebtoken')

const authmiddileware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "no token, access denied" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        return next()
    }
    catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

module.exports = authmiddileware;