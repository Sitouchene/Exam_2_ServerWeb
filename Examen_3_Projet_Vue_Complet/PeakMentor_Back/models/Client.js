import { DataTypes } from 'sequelize';
import database from '../config/connexion.js'; 
import User from './User.js';


// Tableau pour les provinces du Canada
const canadianProvinces = [
    'AB', // Alberta
    'BC', // Colombie-Britannique
    'MB', // Manitoba
    'NB', // Nouveau-Brunswick
    'NL', // Terre-Neuve-et-Labrador
    'NS', // Nouvelle-Écosse
    'NT', // Territoires du Nord-Ouest
    'NU', // Nunavut
    'ON', // Ontario
    'PE', // Île-du-Prince-Édouard
    'QC', // Québec
    'SK', // Saskatchewan
    'YT', // Yukon
  ];

const Client = database.define('client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            len: {
                args: [4, 255],
                msg: "Ce champs doit contenir entre 4 et 255 caractères."
            }
        }
    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 255],
                msg: "Le champs doit contenir entre 4 et 255 caractères."
            }
        }

    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "L'email du contact doit être une adresse email valide."
            }
        }
    },
    address_unit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    address_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address_avenue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,

        allowNull: false,
        defaultValue:'Ottawa'
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'K1N 1A1',
        validate: {
            is: {
                args: [/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/],
                msg: "Le code postal doit être au format A1A 1A1."
            }
        }
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'ON',
        validate: {
            isIn: {
                args: [canadianProvinces],
                msg: "La province doit être un indicatif postal valide du Canada."
            }
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'Canada'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    //tableName: 'clients',
    timestamps: false
});

export default Client;