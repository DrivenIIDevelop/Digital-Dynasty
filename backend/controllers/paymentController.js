const Payment = require('../models/Payment');

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { client_id, payment_date, amount, method } = req.body;
    const payment = new Payment({ client_id, payment_date, amount, method });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.payment_id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { client_id, payment_date, amount, method } = req.body;
    const payment = await Payment.findByIdAndUpdate(req.params.payment_id, { client_id, payment_date, amount, method }, { new: true });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.payment_id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
