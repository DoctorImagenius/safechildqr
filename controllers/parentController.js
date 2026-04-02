const Parent = require("../models/Parent");
const Child = require("../models/Child");
const bcrypt = require("bcryptjs");
const { handleValidation } = require("../utils/validators");
const { sanitizeParent } = require("../utils/helpers");


const getParentData = async (req, res, next) => {
    try {
        const parent = await Parent.findById(req.user._id).populate("children");
        res.json(sanitizeParent(parent));
    } catch (err) {
        next(err);
    }
}

const updateParentData = async (req, res, next) => {
    try {
        handleValidation(req);

        const allowed = ["emergencyNumber", "password"];
        const updates = {};

        for (let key of allowed) {
            if (req.body[key]) updates[key] = req.body[key];
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const parent = await Parent.findByIdAndUpdate(req.user._id, updates, { new: true });

        res.json(sanitizeParent(parent));
    } catch (err) {
        next(err);
    }
}

const deleteParentData = async (req, res, next) => {
    try {
        await Child.deleteMany({ parent: req.user._id });  // we will use transaction in future
        await Parent.findByIdAndDelete(req.user._id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getParentData,
    updateParentData,
    deleteParentData
}