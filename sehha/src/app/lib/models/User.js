const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"], // Removed "nurse"
    default: "patient",
  },
  name: { type: String, required: true },
  profilePicture: { type: String },
  phoneNumber: { type: String, match: /^[0-9]{10}$/ },
  address: { type: String },
  status: {
    type: String,
    enum: ["active", "suspended", "pending"],
    default: "active",
  },
  // Patient-specific fields
  petType: { type: String },
  petName: { type: String },
  // Doctor-specific fields
  licenseNumber: { type: String },
  qualifications: { type: [String] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
