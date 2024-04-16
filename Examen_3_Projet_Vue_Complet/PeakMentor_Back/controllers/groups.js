import {Group} from "../models/relations.js";

//Lecture de la liste des groups (groupes)
export const getGroups = async (req, res) => {
    try {
        const groups = await Group.findAll()
        res.status(200).json({ data: groups })
    } catch (error) {
        res.status(500).json({ message:"Erreur de la recuperation des groupes " + error.message })
    }

}

// Creation d'un groupe
export const addGroup = async (req, res) => {
    //Recuperation du groupe
    const group = req.body
    try {
        await Group.create(group)
        res.status(201).json({ message: "Groupe (group) crée avec succes!" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Mise a jour d'un groupe (group)
export const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Group.update(req.body, { where: { id: id } });

        if (updated) {
            const updatedGroup = await Group.findOne({ where: { id: id } });
            res.status(200).json(updatedGroup);
        } else {
            return res.status(404).json({message:"La groupe (group) indiqué non retrouvé"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Suppression d'un groupe (group)
export const deleteGroup = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ message: "La groupe indiqué (group) n'existe pas." });
    }

    try {
        const deleted = await Group.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: "La groupe indiqué (group) a été supprimé avec succès." });
        } else {
            return res.status(404).json({ message: "La groupe indiqué (group) n'existe pas." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

