const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: [true, "חובה להוסיף תיאור עסקה"],
  },
  amount: {
    type: Number,
    trim: true,
    required: [true, "חובה להוסיף את סכום העסקה"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
