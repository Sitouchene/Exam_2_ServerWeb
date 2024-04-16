//Importer la base de donnée pour créer les modèles (models/Role.js)
import database from "../config/connexion.js";
import {DataTypes } from 'sequelize'

//Tableau de la liste des roles

//Modèle de la table Role
const Role = database.define('role', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true,
        
    },
    role_name: { type: DataTypes.STRING, allowNull: false, unique:true,
    
        validate: {
            len: {
                args: [4, 255],
                msg: "Ce champs doit contenir entre 4 et 255 caractères."
            }
        }
    },
    role_description:{type:DataTypes.TEXT},

},
{ timestamps: false} //Ne pas avoir les colonnes createdAt and updatedAt automatiquement
)
export default Role
