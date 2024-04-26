const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().exec(); 
    if (!clients || clients.length === 0) {
      return res.status(404).json({ message: 'No clients found' });
    }
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
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.createClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check for required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    // Validate email format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Check if the client already exists
    const existingClient = await Client.findOne({ email }).exec();
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    const newClient = await Client.create({ name, email, phone });
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
    const updatedClient = await Client.findByIdAndUpdate(clientId, updatedClientData, { new: true }).exec();
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.client_id;
    const result = await Client.deleteOne({ _id: clientId }).exec();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};
