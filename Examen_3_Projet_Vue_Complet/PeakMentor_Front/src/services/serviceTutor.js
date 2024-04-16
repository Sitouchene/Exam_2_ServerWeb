// Importer notre copie d'axios
import http from "./auth/axiosAPI";

const useTutor = () => {
    // Créer une fonction pour récupérer la liste des tuteurs
    const getAllTutors = async () => {
        const tutors = await http.get(`/tutors`);
        return tutors.data;
    };

    // Supprimer un tuteur par son ID
    const deleteTutor = async (id) => {
        await http.delete(`/tutors/${id}`);
    };

    // Récupérer un tuteur par son ID
    const getTutorById = async (id) => {
        const tutor = await http.get(`/tutors/${id}`);
        return tutor.data;
    };

    // Ajouter un nouveau tuteur
    const addTutor = async (tutor) => {
        await http.post(`/tutors`, tutor);
    };

    // Mettre à jour les informations d'un tuteur
    const updateTutor = async (id, tutor) => {
        await http.put(`/tutors/${id}`, tutor);
    };

    return { getAllTutors, deleteTutor, getTutorById, addTutor, updateTutor };
};

export default useTutor;
