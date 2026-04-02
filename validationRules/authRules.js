const { body } = require("express-validator")

const signupValidationRule = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .normalizeEmail(),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
        .withMessage("Password must be strong (8+ chars, upper, lower, number, special char)"),
    body("emergencyNumber").matches(/^03\d{9}$/).notEmpty().withMessage("Emergency number is required")
]

const loginValidationRule = [
    body("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    body("password").exists()
]


module.exports = {
    signupValidationRule,
    loginValidationRule
}