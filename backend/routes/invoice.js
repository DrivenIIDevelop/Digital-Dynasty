const router = require('express').Router();
const { getInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } = require('../controllers/invoice');

router.get('/', getInvoices);
router.get('/:invoiceId', getInvoiceById);
router.post('/', createInvoice);
router.put('/:invoiceId', updateInvoice);
router.delete('/:invoiceId', deleteInvoice);

module.exports = router;