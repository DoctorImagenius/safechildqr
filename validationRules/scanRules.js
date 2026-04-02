const {param} = require("express-validator");

const scanParamValidationRules = [
    param("code").notEmpty().withMessage("Scan code is required")
]

module.exports = {
    scanParamValidationRules
}