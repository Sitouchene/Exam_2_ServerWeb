//Model correspondant aux differentes formations offertes (catalogue des formations)
import { DataTypes } from "sequelize";
import database from "../config/connexion.js"

//Modele de la table trainings

const Training=database.define('training',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    training_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            len: {
                args: [4, 255],
                msg: "Ce champs doit contenir entre 4 et 255 caractères."
            }
        }
    },
    training_description:{
        type:DataTypes.TEXT
    }

},{timestamps:false});
export default Training;