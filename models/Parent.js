const mongoose = require("mongoose");


const parentSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    emergencyNumber: { type: String, required: true },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }]
}, { timestamps: true });

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
