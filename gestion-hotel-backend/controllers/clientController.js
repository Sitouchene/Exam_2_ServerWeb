const { validationResult } = require('express-validator');
const { Client } = require('../models');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Failed to fetch clients' });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Failed to fetch client' });
  }
};

exports.createClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nom, prenom, email, telephone, adresse } = req.body;
    const client = await Client.create({ nom, prenom, email, telephone, adresse });
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, telephone, adresse } = req.body;
  try {
    let client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    client.nom = nom;
    client.prenom = prenom;
    client.email = email;
    client.telephone = telephone;
    client.adresse = adresse;
    await client.save();
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    await client.destroy();
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


/*module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};*/
