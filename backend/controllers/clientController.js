const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().exec(); 
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.getClientById = async (req, res) => {
  try {
    const clientId = req.params.client_id;
    const client = await Client.findById(clientId).exec();
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await Client.create(clientData);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const clientId = req.params.client_id;
    const updatedClientData = req.body;
    const updatedClient = await Client.updateOne({ _id: clientId }, { $set: updatedClientData }).exec();
    if (updatedClient.nModified > 0) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.client_id;
    const result = await Client.deleteOne({ _id: clientId }).exec();
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};
