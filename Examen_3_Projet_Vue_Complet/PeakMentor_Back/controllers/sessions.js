import Session from "../models/Session.js";

// Obtenir toutes les sessions
export const getSessions = async (req, res) => {
    try {
      const sessions = await Session.findAll();
      res.json(sessions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Ajouter une session
  export const addSession = async (req, res) => {
    try {
      const session = await Session.create(req.body);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  // Mettre à jour une session
  export const updateSession = async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Session.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedSession = await Session.findOne({ where: { id: id } });
        res.status(200).json(updatedSession);
      } else {
        res.status(404).send("Session non trouvée.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Supprimer un contrat
  export const deleteSession = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Session.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.status(204).send("Session supprimée.");
      } else {
        res.status(404).send("Session non trouvée.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };