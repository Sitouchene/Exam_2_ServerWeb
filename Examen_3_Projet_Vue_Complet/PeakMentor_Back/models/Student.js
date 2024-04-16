import { DataTypes } from 'sequelize';
import database from '../config/connexion.js'; 
import User from './User.js';
import Client from './Client.js';


//Modele de la table students

const Student = database.define('student', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    job_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      
    },
    direction: {
        type: DataTypes.STRING(255),
        allowNull: false,
        
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '2000-01-01',
      validate: {
        isDate: { msg: 'La date de naissance doit être une date valide.' },
        
      }
    },
    
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        
    },
    
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        is: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
      }
    },
    
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    },
    clientId: {
        type: DataTypes.INTEGER,
        references: {
          model: Client,
          key: 'id',
        }
      },
      
    
  }, {
    timestamps: false
  });
  
  export default Student;