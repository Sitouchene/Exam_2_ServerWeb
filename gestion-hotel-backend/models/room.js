'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.Reservation, { foreignKey: 'roomId' });
    }
  }
  Room.init({
    number: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};