'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {

    static associate(models) {
      Service.belongsToMany(models.Reservation, { through: 'ReservationService', foreignKey: 'serviceId' });
    }
  }
  Service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};