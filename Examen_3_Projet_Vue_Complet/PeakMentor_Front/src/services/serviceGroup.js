// Importer notre copie d'axios
import http from "./auth/axiosAPI";

const useGroup = () => {
    // Créer une fonction pour récupérer la liste des Groups
    const getAllGroups = async () => {
        const Groups = await http.get(`/Groups`);
        
        return Groups.data;
    };

    // Supprimer un group par son ID
    const deleteGroup = async (id) => {
        await http.delete(`/Groups/${id}`);
    };

    // Récupérer un group par son ID
    const getGroupById = async (id) => {
        const group = await http.get(`/Groups/${id}`);
        
        return group.data;
    };

    // Ajouter un nouveau group
    const addGroup = async (group) => {
        await http.post(`/Groups`, group);
    };

    // Mettre à jour les informations d'un group
    const updateGroup = async (id, group) => {
        await http.put(`/Groups/${id}`, group);
    };

    return { getAllGroups, deleteGroup, getGroupById, addGroup, updateGroup };
};

export default useGroup;
