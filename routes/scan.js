const express = require("express");
const router = express.Router();
const { scan } = require("../controllers/scanController");
const { scanParamValidationRules } = require("../validationRules/scanRules");


router.get("/:code" ,scanParamValidationRules, scan);


module.exports = router;