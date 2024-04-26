const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// list all clients
router.get('/', clientController.getAllClients);

// create new client
router.post('/', clientController.createClient);

// retrieve client details
router.get('/:client_id', clientController.getClientById);

// update client details
router.put('/:client_id', clientController.updateClient);

// delete client
router.delete('/:client_id', clientController.deleteClient);

module.exports = router;
