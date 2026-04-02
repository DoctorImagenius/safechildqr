const rateLimit = require("express-rate-limit")


const loginRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many requests, please try again after 1 minute"
})

const scanRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Too many scans, please try again after 5 minutes"
})


module.exports = {
    loginRateLimiter,
    scanRateLimiter
}