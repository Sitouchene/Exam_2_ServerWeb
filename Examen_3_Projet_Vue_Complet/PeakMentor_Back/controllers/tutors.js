import Tutor from "../models/Tutor.js";

// Obtenir tous les tuteurs
export const getTutors = async (req, res) => {
    try {
      const tutors = await Tutor.findAll();
      res.json(tutors);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Ajouter un tuteur
  export const addTutor = async (req, res) => {
    try {
      const tutor = await Tutor.create(req.body);
      res.status(201).json(tutor);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  // Mettre à jour un tuteur
  export const updateTutor = async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Tutor.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedTutor = await Tutor.findOne({ where: { id: id } });
        res.status(200).json(updatedTutor);
      } else {
        res.status(404).send("Tuteur non trouvé.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Supprimer un tuteur
  export const deleteTutor = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Tutor.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.status(204).send("Tuteur supprimé.");
      } else {
        res.status(404).send("Tuteur non trouvé.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };