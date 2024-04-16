import { Sequelize, DataTypes } from 'sequelize';
import database from '../config/connexion.js';
import Group from './Group.js';
import Student from './Student.js';

const GroupStudent = database.define('GroupStudent', {

    groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: Group,
          key: 'id',
        }
    },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
              model: Student,
              key: 'id',
            }}
   
  }, {
    // options
    timestamps: false // si vous ne voulez pas des timestamps
  });
  export default GroupStudent;
