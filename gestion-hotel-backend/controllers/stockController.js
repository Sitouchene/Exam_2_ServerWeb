const { validationResult } = require('express-validator');
const { Stock } = require('../models');

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ message: 'Failed to fetch stocks' });
  }
};

exports.getStockById = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(stock);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ message: 'Failed to fetch stock' });
  }
};

exports.createStock = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { supplierId, productName, quantity, unitPrice } = req.body;
    const stock = await Stock.create({ supplierId, productName, quantity, unitPrice });
    res.status(201).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateStock = async (req, res) => {
  const { id } = req.params;
  const { supplierId, productName, quantity, unitPrice } = req.body;
  try {
    let stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    stock.supplierId = supplierId;
    stock.productName = productName;
    stock.quantity = quantity;
    stock.unitPrice = unitPrice;
    await stock.save();
    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteStock = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    await stock.destroy();
    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/*module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock
};*/