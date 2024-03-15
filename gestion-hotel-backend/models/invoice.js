'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.Reservation, { foreignKey: 'reservationId' });
    }
  }
  Invoice.init({
    reservationId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};