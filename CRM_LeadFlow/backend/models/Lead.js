const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, default: "Unknown" },
  status: { type: String, default: "New" },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);