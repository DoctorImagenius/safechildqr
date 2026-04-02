const express = require("express");
const router = express.Router();
const { scan } = require("../controllers/scanController");
const { scanParamValidationRules } = require("../validationRules/scanRules");
const { scanRateLimiter } = require("../middlewares/rateLimiter");


router.get("/:code", scanParamValidationRules, scanRateLimiter, scan);


module.exports = router;