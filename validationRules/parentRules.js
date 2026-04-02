const { body } = require("express-validator")


const parentValidationRule = [
    body("emergencyNumber").optional().matches(/^03\d{9}$/),
    body("password").optional().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
        .withMessage("Password must be strong (8+ chars, upper, lower, number, special char)")
]

module.exports = {
    parentValidationRule
}