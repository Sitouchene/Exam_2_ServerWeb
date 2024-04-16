import Client from '../models/Client.js';

//Lecture de la liste des clients
export const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll()
        res.status(200).json({ data: clients })
    } catch (error) {
        res.status(500).json({ message:"Erreur de la recuperation des clients "+ error.message })
    }

}

// Creation d'un client
export const addClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json({client:client,message:"Client crée avec succes!"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mise a jour d'un client
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Client.update(req.body, { where: { id: id } });

        if (updated) {
            const updatedClient = await Client.findOne({ where: { id: id } });
            res.status(200).json(updatedClient);
        } else {
            throw new Error("Client indiqué non retrouvé");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Suppression de client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Client.destroy({ where: { id: id } });

        if (deleted) {
            res.status(200).json({ message: "Client indiqué supprimé avec succes" });
        } else {
            throw new Error("Client indiqué n'existe pas");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};