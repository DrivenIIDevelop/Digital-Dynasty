const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  invoice_date: {
    type: Date,
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  }},
  { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
