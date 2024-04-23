const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// List all clients
router.get('/', clientController.getAllClients);

// Create new client
router.post('/', clientController.createClient);

// Retrieve client details
router.get('/:client_id', clientController.getClientById);

// Update client details
router.put('/:client_id', clientController.updateClient);

// Delete client
router.delete('/:client_id', clientController.deleteClient);

module.exports = router;
