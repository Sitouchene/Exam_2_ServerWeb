//Importer les modeles
import User from "./User.js";
import Role from "./Role.js";
import Client from "./Client.js"
import Training from "./Training.js";
import Group from "./Group.js"
import Tutor from "./Tutor.js"
import Student from "./Student.js"
import Contract from "./Contract.js"
import Session from "./Session.js"
import GroupStudent from "./GroupStudent.js";

//Creation des relations



// Role <-> User
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// User <-> Tutor
User.hasOne(Tutor, { foreignKey: 'userId' });
Tutor.belongsTo(User, { foreignKey: 'userId' });

// User <-> Client
User.hasOne(Client, { foreignKey: 'userId' });
Client.belongsTo(User, { foreignKey: 'userId' });

// User <-> Student
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

// Tutor <-> Session
Tutor.hasMany(Session, { foreignKey: 'tutorId' });
Session.belongsTo(Tutor, { foreignKey: 'tutorId' });

// Client <-> Contract
Client.hasMany(Contract, { foreignKey: 'clientId' });
Contract.belongsTo(Client, { foreignKey: 'clientId' });

// Contract <-> Session
Contract.hasMany(Session, { foreignKey: 'contractId' });
Session.belongsTo(Contract, { foreignKey: 'contractId' });

// Contract <-> Training
Training.hasMany(Contract, { foreignKey: 'trainingId' });
Contract.belongsTo(Training, { foreignKey: 'trainingId' });

// Contract <-> Group
Contract.hasOne(Group, { foreignKey: 'contractId' });
Group.belongsTo(Contract, { foreignKey: 'contractId' });

//Student <-> Group
Group.belongsToMany(Student, { through: 'GroupStudent', foreignKey: 'groupId' });
Student.belongsToMany(Group, { through: 'GroupStudent', foreignKey: 'studentId' });



export { Role,User,Client,Training,Group,Tutor, Student,Contract, Session, GroupStudent}