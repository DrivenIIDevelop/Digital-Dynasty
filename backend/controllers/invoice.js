const Invoice = require('../models/Invoice');

const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();

        if(invoices.length === 0){
            console.error('Invoices not found');
            return res.status(404).json({ error: 'Invoices not found'});
        }

        return res.json(invoices);
    } catch (error) {
        console.error('Error while retrieving invoices: ', error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const getInvoiceById = async (req, res) => {
    try {
        const invoiceId =  req.params.invoiceId;

        if(!invoiceId){
            console.error('Invlaid invoiceId');
            return res.status(404).json({ error: 'Invoice not found'});
        }

        const invoice = await Invoice.findOne({ _id: invoiceId});

        if(!invoice){
            console.error('Invoice not found');
            return res.status(404).json({ error: 'Invoice not found'});
        }

        return res.json(invoice);
        
    } catch (error) {
        console.error('Error while retrieving an Invoice by invoiceId');
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const createInvoice = async (req, res) => {
    try {
        const { user_id, client_id, invoice_date, amount, status } = req.body;

        if(!user_id || !client_id || !invoice_date || !amount || status ){
            console.error('All the fields are required');
            return res.status(400).json({ error: 'All the fields are required'});
        }
              
        const newInvoice = await Invoice.create(req.body);

        return res.status(201).json(newInvoice);

    } catch (error) {
        console.error('Error while creating an invoice: ', error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const updateInvoice = async (req, res) => {
    console.log("Updating invoice")
};

const deleteInvoice = async (req, res) => {
    console.log("Deleting invoice")
};

module.exports = {
    getInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
};