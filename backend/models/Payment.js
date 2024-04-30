const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  payment_date: {
    type: Date,
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  method: {
    type: String,
    enum: ['credit_card', 'bank_transfer', 'cash'],
    required: true
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
