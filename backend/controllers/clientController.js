const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createClient = async (req, res) => {
    const client = new Client({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.client_id);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.client_id, req.body, { new: true });
        if (updatedClient) {
            res.json(updatedClient);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndRemove(req.params.client_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
