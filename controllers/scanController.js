const Child = require("../models/Child");
const ScanLog = require("../models/ScanLog");
const mailQueue = require("../queues/mailQueue");
const { handleValidation } = require("../utils/validators");


const queueScanSideEffects = async (child, req) => {
    try {
        await Promise.race([
            mailQueue.add("sendEmail", {
                email: child.parent.email,
                childName: child.name,
                ip: req.ip,
                deviceInfo: req.headers["user-agent"]
            }, {
                attempts: 3,
                backoff: 5000
            }),
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Mail queue timed out")), 2000);
            })
        ]);
    } catch (err) {
        console.error("Failed to queue scan email:", err.message);
    }
};


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

        await ScanLog.create({
            child: child._id,
            parent: child.parent._id,
            ipAddress: req.ip,
            deviceInfo: req.headers["user-agent"],
        });

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
        queueScanSideEffects(child, req);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    scan
}
