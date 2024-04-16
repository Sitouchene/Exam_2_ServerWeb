import database from "../config/connexion.js";
import { DataTypes } from 'sequelize';
import Role from "./Role.js";

const User = database.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 255],
                msg: "Le champs 'lastname' doit contenir au moins 4 caracteres."
            }
        }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 255],
                msg: "Le champs 'firstname' doit contenir au moins 4 caracteres."
            }
        }
    },    
    date_of_birth: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: {
                msg: 'La date de naissance doit être une date valide.'
            },
            isBefore: {
                args: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0],
                msg: "L'utilisateur doit avoir au moins 18 ans."
            }
        }
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                msg: 'Le numéro de téléphone doit être un numéro canadien valide.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "L'adresse e-mail doit être une adresse e-mail valide."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {  
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id',
        },
    }
}, {
    timestamps: false // Ne pas avoir les colonnes createdAt and updatedAt automatiquement
});

export default User;
