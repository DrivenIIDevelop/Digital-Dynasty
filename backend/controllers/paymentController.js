const Payment = require('../models/Payment');

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { client_id, payment_date, amount, method } = req.body;

    // Check if required fields are present
    if (!client_id || !payment_date || !amount || !method) {
      return res.status(400).json({ message: 'Client ID, payment date, amount, and method are required' });
    }

    // Create the payment
    const payment = new Payment({ client_id, payment_date, amount, method });
    await payment.save();

    // Return the newly created payment
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    // Check if amount is present
    if (!amount || amount < 1 ) {
      return res.status(400).json({ message: 'Amount is required for updating payment' });
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.payment_id,
      { amount },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
