import {GroupStudent} from "../models/relations.js";

//Lecture de la liste des groupsstudents (constitution des groupes)
export const getGroupsStudents = async (req, res) => {
    try {
        const groupsstudents = await GroupStudent.findAll()
        res.status(200).json({ data: groupsstudents })
    } catch (error) {
        res.status(500).json({ message:"Erreur de la recuperation des groupes " + error.message })
    }

}

// Creation d'un groupestudent (constitution)
export const addGroupStudent = async (req, res) => {
    //Recuperation du groupestudent
    const groupstudent = req.body
    try {
        await GroupStudent.create(groupstudent)
        res.status(201).json({ message: "GroupStudent (group) crée avec succes!" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Mise a jour d'un groupe (group)
export const updateGroupStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await GroupStudent.update(req.body, { where: { id: id } });

        if (updated) {
            const updatedGroupStudent = await GroupStudent.findOne({ where: { id: id } });
            res.status(200).json(updatedGroupStudent);
        } else {
            return res.status(404).json({message:"La groupstudent (group) indiqué non retrouvé"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Suppression d'un groupe (group)
export const deleteGroupStudent = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ message: "La groupestudent indiqué (group) n'existe pas." });
    }

    try {
        const deleted = await GroupStudent.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: "La groupestudent indiqué (group) a été supprimé avec succès." });
        } else {
            return res.status(404).json({ message: "La groupestudent indiqué (group) n'existe pas." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

