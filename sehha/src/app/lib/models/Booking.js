const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  department: { type: String, required: true },
  date: { type: Date, required: true }, // تغيير من String إلى Date
  startTime: { type: String, required: true }, // وقت البدء (مثل "14:30")
  endTime: { type: String, required: true }, // وقت الانتهاء
  emergency: { type: Boolean, default: false },
  reason: { type: String, required: true }, // سبب الزيارة
  notes: { type: String }, // ملاحظات إضافية
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed", "cancelled"],
    default: "pending",
  },
  prescription: { type: String }, // الوصفة الطبية (يمكن أن تكون نصًا أو رابطًا لملف)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
