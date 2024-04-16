import { DataTypes } from 'sequelize';
import database from '../config/connexion.js'; 
import User from './User.js';


//Modele de la table tutors

const Tutor = database.define('tutor', {
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
    NAS: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        is: {
          args:/^(\d{9}|\d{3}[-\s]?\d{3}[-\s]?\d{3})$/,
          msg: "Le NAS doit être un numéro valide."
        }
        
      }
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '2000-01-01',
      validate: {
        isDate: { msg: 'La date de naissance doit être une date valide.' },
        isBefore: {
          args: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0],
          msg: 'Le tutor doit avoir au moins 18 ans.'
        }
      }
    },
    contract_category: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['permanent', 'at term', 'hourly']]
      }
    },
    hiring_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date().toISOString().split('T')[0], // Sets today's date as default
      validate: {
        isDate: true,
        isGreaterThanDOB(value) {
          let dobPlus18 = new Date(this.DOB);
          dobPlus18.setFullYear(dobPlus18.getFullYear() + 18);
          if (new Date(value) <= dobPlus18) {
            throw new Error("Le tuteur doit avoir au moins 18 ans a la date de recrutement.");
          }
        }
      }
    },
    ending_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
      }
    },
    active_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    effective_ending_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
        isBefore: new Date().toString()
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        is: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
      }
    },
    resume_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hourly_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 16.00,
        max: 100.00
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    },
 
  }, {
    timestamps: false
  });
  
  export default Tutor;