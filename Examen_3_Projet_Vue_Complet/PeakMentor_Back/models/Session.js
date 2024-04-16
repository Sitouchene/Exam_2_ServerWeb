import { DataTypes } from 'sequelize';
import database from '../config/connexion.js'; 
import Contract from './Contract.js';
import Tutor from './Tutor.js';


//Modele de la table sessions

const Session = database.define('sessions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_date:{
    type:DataTypes.DATEONLY,
    allowNull:false
  },
  start_time: {
    type: DataTypes.TIME,
    defaultValue: '08:00:00'
  },
  end_time: {
    type: DataTypes.TIME,
    defaultValue: '12:00:00'
  },
  duration: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    validate: {
      isPositive(value) {
        if (value < 0) {
          throw new Error('Duration must be positive');
        }
      }
    }
  },
  modifiable_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  session_stage: {
    type: DataTypes.ENUM('created', 'submitted', 'approved', 'billed'),
    allowNull: false
  },
  cancelled_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: null
  },
  billable_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: null
  },
  effective_start_time: {
    type: DataTypes.TIME,
    defaultValue: null
  },
  effective_end_time: {
    type: DataTypes.TIME,
    defaultValue: null
  },
  effective_duration: {
    type: DataTypes.DECIMAL(10, 2)
  },
  claimed_hours: {
    type: DataTypes.DECIMAL(10, 2)
  },
  technical_issue_comment: {
    type: DataTypes.TEXT
  },
  pedagogical_comment: {
    type: DataTypes.TEXT
  },
  contractId: {
    type: DataTypes.INTEGER,
    references: {
      model: Contract,
      key: 'id'
    }
  },
  tutorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tutor,
      key: 'id'
    }
  }
    
  }, {
    timestamps: false
  });
  
  export default Session;