const rateLimit = require("express-rate-limit")


const loginRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many requests, please try again after 1 minute"
})


module.exports = {
    loginRateLimiter
}