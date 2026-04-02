const mongoose = require("mongoose");


const scanLogSchema = new mongoose.Schema({
    child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
    ipAddress: String,
    deviceInfo: String,
}, { timestamps: true });

const ScanLog = mongoose.model("ScanLog", scanLogSchema);

module.exports = ScanLog;