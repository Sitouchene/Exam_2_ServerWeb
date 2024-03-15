'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Supplier, { foreignKey: 'supplierId' });
    }
  }
  Stock.init({
    supplierId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};