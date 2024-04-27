const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  vendor_id: {
    type: Number,
    required: true
  },
  expense_date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
