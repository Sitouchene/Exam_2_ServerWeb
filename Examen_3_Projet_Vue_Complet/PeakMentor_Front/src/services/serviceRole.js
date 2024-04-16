import http from "./auth/axiosAPI";

const useRole = () => {
    const getAllRoles = async () => {
        const roles = await http.get(`/roles`)
        return roles.data
    }

    return { getAllRoles }
}

export default useRole