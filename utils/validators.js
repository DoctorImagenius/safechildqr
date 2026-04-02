const { validationResult } = require("express-validator");


const handleValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("Validation Error");
        err.statusCode = 400;
        err.details = errors.array();
        throw err;
    }
};

module.exports = {
    handleValidation
}