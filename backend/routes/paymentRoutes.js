const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.getAllPayments);
router.post('/', paymentController.createPayment);
router.get('/:payment_id', paymentController.getPaymentById);
router.put('/:payment_id', paymentController.updatePayment);
router.delete('/:payment_id', paymentController.deletePayment);

module.exports = router;
