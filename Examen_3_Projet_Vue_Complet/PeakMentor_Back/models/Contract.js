import { DataTypes } from 'sequelize';
import database from '../config/connexion.js'; 
import Training from './Training.js';
import Client from './Client.js';
import Group from './Group.js';

//Modele de la table contrats

const Contract = database.define('contract', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    training_class: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "individual"
      
    },
    training_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "on line"
     
      
    },
    hours_quantity: {
      type: DataTypes.DECIMAL(10, 2),
      
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0] // 31 décembre de l'année en cours
    },
    hourly_rate: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 85.00
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      }
    },
    trainingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Training,
        key: 'id',
      }
    }
    
  }, {
    timestamps: false
  });
  
  export default Contract;