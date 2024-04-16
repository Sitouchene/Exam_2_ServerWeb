import {Training} from "../models/relations.js";

//Lecture de la liste des trainings (catalogue de formations)
export const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.findAll()
        res.status(200).json({ data: trainings })
    } catch (error) {
        res.status(500).json({ message:"Erreur de la recuperation des formations " + error.message })
    }

}

// Creation d'un type de formation
export const addTraining = async (req, res) => {
    //Recuperation de l'information
    const training = req.body
    
    try {
        await Training.create(training)
        res.status(201).json({ message: "Formation (training) créee avec succes!" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Mise a jour d'une formation (training)
export const updateTraining = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Training.update(req.body, { where: { id: id } });

        if (updated) {
            const updatedTraining = await Training.findOne({ where: { id: id } });
            res.status(200).json(updatedTraining);
        } else {
            return res.status(404).json({message:"La formation (training) indiquée non retrouvé"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Suppression d'une formation (training)
export const deleteTraining = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ message: "La formation indiquée (training) n'existe pas." });
    }

    try {
        const deleted = await Training.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: "La formation indiquée (training) a été supprimés avec succès." });
        } else {
            return res.status(404).json({ message: "La formation indiquée (training) n'existe pas." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

