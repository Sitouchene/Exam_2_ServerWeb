import { Role, User } from "../models/relations.js";

//Importer le module de hachage
import bcrypt from 'bcryptjs'

//Validation
import { validationResult } from "express-validator";


//Lecture de la liste des users
export const usersList = async (req, res) => {
    try {
      // Obtenir les paramètres de pagination de la requête, ou utiliser des valeurs par défaut
      const page = parseInt(req.query.page, 10) || 1; // La pagination commence à la page 1
      const limit = parseInt(req.query.limit, 10) || 10; // Par défaut, 10 utilisateurs par page
      const offset = (page - 1) * limit;

      const { count, rows } = await User.findAndCountAll({
          limit,
          offset
      });

      // Calculer le nombre total de pages
      const totalPages = Math.ceil(count / limit);

      res.status(200).json({
          data: rows,
          totalItems: count,
          totalPages: totalPages,
          currentPage: page
      });
    } catch (error) {
        res.status(500).json({ message:"Erreur de la recuperation des utilisateurs"+ error.message })
    }

}

//Creation d'un utilisateur
export const addUser = async (req, res) => {
    //Recuperation des resultats de la validation 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Recuperation des informations de l'utilisateur
    const {id, lastname,firstname, date_of_birth,photo,phone_number,email, password,roleId} = req.body
    console.log('Password before hash:', password);

    //Hachage du mot de passe 
    const mdpHache = bcrypt.hashSync(password, 10)
    console.log('Password after hash:', mdpHache);
    

    const user = {id, lastname,firstname, date_of_birth,photo,phone_number,email, password:mdpHache,roleId}
    //Sauvegarder dans la base de donnees
    

    try {
        await User.create(user)
        res.status(201).json({ message: "Compte crée avec succes!" })
        console.log('User object:', user);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Mise a jour d'un user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, { where: { id: id } });

        if (updated) {
            const updatedUser = await User.findOne({ where: { id: id } });
            res.status(200).json(updatedUser);
        } else {
            return res.status(404).json({message:"L'utilisateur (user) indiqué non retrouvé"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Suppression d'un utilisateur (user)
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ message: "L'utilisateur indiqué n'existe pas." });
    }

    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: "Utilisateur supprimé avec succès." });
        } else {
            return res.status(404).json({ message: "L'utilisateur indiqué n'existe pas." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

