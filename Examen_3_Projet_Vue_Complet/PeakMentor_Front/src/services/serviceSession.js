// Importer notre copie d'axios
import http from "./auth/axiosAPI";

const useSession = () => {
    // Créer une fonction pour récupérer la liste des sessions
    const getAllSessions = async () => {
        const sessions = await http.get(`/sessions`);
        
        return sessions.data;
    };

    // Supprimer un session par son ID
    const deleteSession = async (id) => {
        await http.delete(`/sessions/${id}`);
    };

    // Récupérer un session par son ID
    const getSessionById = async (id) => {
        const session = await http.get(`/sessions/${id}`);
        
        return session.data;
    };

    // Ajouter un nouveau session
    const addSession = async (session) => {
        await http.post(`/sessions`, session);
    };

    // Mettre à jour les informations d'un session
    const updateSession = async (id, session) => {
        await http.put(`/sessions/${id}`, session);
    };

    return { getAllSessions, deleteSession, getSessionById, addSession, updateSession };
};

export default useSession;
