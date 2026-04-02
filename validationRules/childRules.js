const { body, param } = require("express-validator")


const addChildValidationRule =  [
    body("name").notEmpty().withMessage("Name is required"),
    body("emergencyMessage").notEmpty().withMessage("Emergency message is required"),
    body("age").optional().isInt({ min: 0, max: 18 }).withMessage("Age must be between 0 and 18")
]

const paramRule = [
    param("id").isMongoId().withMessage("Invalid id")
]

const updateValidationRule = [
    param("id").isMongoId().withMessage("Invalid id"),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("emergencyMessage").optional().notEmpty().withMessage("Emergency message is required"),
    body("age").optional().isInt({ min: 0, max: 18 }).withMessage("Age must be between 0 and 18"),
]

const deleteValidationRule = [
    param("id").isMongoId().withMessage("Invalid id")
]

module.exports = {
    addChildValidationRule,
    paramRule,
    updateValidationRule,
    deleteValidationRule
}