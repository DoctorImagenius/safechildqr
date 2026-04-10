const Child = require("../models/Child");
const ScanLog = require("../models/ScanLog");
const { handleValidation } = require("../utils/validators");
const { sendEmail } = require("../utils/helpers");


const scan = async (req, res, next) => {
    try {
        handleValidation(req);

        const { code } = req.params;
        const childId = code.split("+")[0];

        const child = await Child.findById(childId).populate("parent");

        if (!child) {
            const err = new Error("Child not found");
            err.statusCode = 404;
            throw err;
        }

        res.json({
            child: {
                name: child.name || "Unnamed",
                age: child.age || "Unknown",
                emergencyMessage: child.emergencyMessage,
                location: child.location || "Unknown"
            },
            parent: {
                emergencyNumber: child.parent.emergencyNumber
            }
        });

        ScanLog.create({
            child: child._id,
            parent: child.parent._id,
            ipAddress: req.ip,
            deviceInfo: req.headers["user-agent"] || "Unknown",
        }).catch(err =>
            console.error("ScanLog error:", err.message)
        );

        sendEmail(child, req);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    scan
}
