const mongoose = require("mongoose");


const childSchema = new mongoose.Schema({
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent", required: true },
    name: { type: String, trim: true },
    age: { type: Number, min: 0, max: 18 },
    emergencyMessage: { type: String, required: true },
    location: { lat: Number, lon: Number }
}, { timestamps: true });

const Child = mongoose.model("Child", childSchema);

module.exports = Child;