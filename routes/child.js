const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
    addChild,
    getChildData,
    updateChildData,
    deleteChildData
} = require("../controllers/childController");

const {
    addChildValidationRule,
    paramRule,
    updateValidationRule,
    deleteValidationRule
} = require("../validationRules/childRules");

router.post("/", authMiddleware, addChildValidationRule, addChild);

router.get("/:id", authMiddleware, paramRule, getChildData);

router.put("/:id", authMiddleware, updateValidationRule, updateChildData);

router.delete("/:id", authMiddleware, deleteValidationRule, deleteChildData);



module.exports = router;


