const jwt = require("jsonwebtoken");
const Parent = require("../models/Parent");


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            const err = new Error("Unauthorized");
            err.statusCode = 401;
            throw err;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Parent.findById(decoded.id);
        if (!user) {
            const err = new Error("Unauthorized");
            err.statusCode = 401;
            throw err;
        }

        req.user = user;
        next();
    } catch (err) {
        err.statusCode = 401;
        next(err);
    }
};

module.exports = authMiddleware;