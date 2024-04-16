import Contract from "../models/Contract.js";

// Obtenir tous les contrats
export const getContracts = async (req, res) => {
    try {
      const contracts = await Contract.findAll();
      res.json(contracts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Ajouter un contrat
  export const addContract = async (req, res) => {
    try {
      const contract = await Contract.create(req.body);
      res.status(201).json(contract);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  // Mettre à jour un contrat
  export const updateContract = async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Contract.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedContract = await Contract.findOne({ where: { id: id } });
        res.status(200).json(updatedContract);
      } else {
        res.status(404).send("Contrat non trouvé.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Supprimer un contrat
  export const deleteContract = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Contract.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.status(204).send("Contrat supprimé.");
      } else {
        res.status(404).send("Contrat non trouvé.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };