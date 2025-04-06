const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    amount: { type: Number, required: true }, // المبلغ الإجمالي
    items: [
      {
        description: { type: String }, // الخدمة (كشفية، جراحة، تحاليل، إلخ)
        cost: { type: Number },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String }, // Stripe, PayPal, نقدي، إلخ
    transactionId: { type: String }, // رقم المعاملة إذا كان الدفع إلكترونيًا
    issuedAt: { type: Date, default: Date.now },
    dueDate: { type: Date }, // تاريخ الاستحقاق
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
