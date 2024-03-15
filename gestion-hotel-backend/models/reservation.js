'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Client, { foreignKey: 'clientId' });

      Reservation.belongsTo(models.Room, { foreignKey: 'roomId' });


      Reservation.belongsToMany(models.Service, { through: 'ReservationService', foreignKey: 'reservationId' });
    }
  }
  Reservation.init({
    clientId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    arrivalDate: DataTypes.DATE,
    departureDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};