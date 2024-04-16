const { validationResult } = require('express-validator');
const { Service } = require('../models');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

exports.getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Failed to fetch service' });
  }
};

exports.createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, price } = req.body;
    const service = await Service.create({ name, description, price });
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    let service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    service.name = name;
    service.description = description;
    service.price = price;
    await service.save();
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/*module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};*/