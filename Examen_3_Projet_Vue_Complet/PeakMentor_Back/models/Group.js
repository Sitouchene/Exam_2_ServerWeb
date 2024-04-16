//Modele correspondant aux groupes ou classess constitues (et compris individuelle)
// Un modele qui sert a traiter la relation plusieurs a plusieurs entre etudiants-contrats
import { DataTypes } from "sequelize";
import database from "../config/connexion.js"
import Contract from "./Contract.js"
import Student from "./Student.js";

//Modele de la table group

const Group=database.define('group',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    group_name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    group_description:{
        type: DataTypes.TEXT,
        allowNull:true

    },
    contractId: {
        type: DataTypes.INTEGER,
        references: {
          model: Contract,
          key: 'id',
        }}

    

},{timestamps:false});
export default Group;