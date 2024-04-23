const clientModel = require('../models/Client');

exports.getAllClients = (req, res) => {
  try {
    const clients = clientModel.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getClientById = (req, res) => {
  try {
    const clientId = parseInt(req.params.client_id);
    const client = clientModel.getClientById(clientId);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createClient = (req, res) => {
  try {
    const clientData = req.body;
    const newClient = clientModel.createClient(clientData);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateClient = (req, res) => {
  try {
    const clientId = parseInt(req.params.client_id);
    const updatedClientData = req.body;
    const updatedClient = clientModel.updateClient(clientId, updatedClientData);
    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteClient = (req, res) => {
  try {
    const clientId = parseInt(req.params.client_id);
    clientModel.deleteClient(clientId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
