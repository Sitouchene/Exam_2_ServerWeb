// Importer notre copie d'axios
import http from "./auth/axiosAPI";

const useClient = () => {
    // Créer une fonction pour récupérer la liste des clients
    const getAllClients = async () => {
        const clients = await http.get(`/clients`);
        return clients.data;
    };

    // Supprimer un client par son ID
    const deleteClient = async (id) => {
        await http.delete(`/clients/${id}`);
    };

    // Récupérer un client par son ID
    const getClientById = async (id) => {
        const client = await http.get(`/clients/${id}`);
        return client.data;
    };

    // Ajouter un nouveau client
    const addClient = async (client) => {
        await http.post(`/clients`, client);
    };

    // Mettre à jour les informations d'un client
    const updateClient = async (id, client) => {
        await http.put(`/clients/${id}`, client);
    };

    return { getAllClients, deleteClient, getClientById, addClient, updateClient };
};

export default useClient;
