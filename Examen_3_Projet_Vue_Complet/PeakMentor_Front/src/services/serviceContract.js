// Importer notre copie d'axios
import http from "./auth/axiosAPI";

const useContract = () => {
    // Créer une fonction pour récupérer la liste des contracts
    const getAllContracts = async () => {
        const contracts = await http.get(`/contracts`);
        
        return contracts.data;
    };

    // Supprimer un contract par son ID
    const deleteContract = async (id) => {
        await http.delete(`/contracts/${id}`);
    };

    // Récupérer un contract par son ID
    const getContractById = async (id) => {
        const contract = await http.get(`/contracts/${id}`);
        
        return contract.data;
    };

    // Ajouter un nouveau contract
    const addContract = async (contract) => {
        await http.post(`/contracts`, contract);
    };

    // Mettre à jour les informations d'un contract
    const updateContract = async (id, contract) => {
        await http.put(`/contracts/${id}`, contract);
    };

    return { getAllContracts, deleteContract, getContractById, addContract, updateContract };
};

export default useContract;
