// Importer notre copie d'axios
import http from "./auth/axiosAPI";

const useUser = () => {
    // Créer une fonction pour récupérer la liste des utilisateurs
    const getAllUsers = async () => {
        const users = await http.get(`/users`);
        return users.data;
    };

    // Supprimer un utilisateur par son ID
    const deleteUser = async (id) => {
        await http.delete(`/users/${id}`);
    };

    // Récupérer un utilisateur par son ID
    const getUserById = async (id) => {
        const user = await http.get(`/users/${id}`);
        return user.data;
    };

    // Ajouter un nouvel utilisateur
    const addUser = async (user) => {
        await http.post(`/users`, user);
    };

    // Mettre à jour les informations d'un utilisateur
    const updateUser = async (id, user) => {
        await http.put(`/users/${id}`, user);
    };

    return { getAllUsers, deleteUser, getUserById, addUser, updateUser };
};

export default useUser;
