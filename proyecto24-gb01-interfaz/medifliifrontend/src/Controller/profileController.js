import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URL_Usuarios;
const path = "profiles";

const profilesService = {
    // Obtener todos los perfiles de un usuario
    getAllProfiles: async () => {
        const response = await axios.get(`${API_URL}${path}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // Para incluir cookies en la solicitud
        });
        return response.data;
    },
    getProfilesByUserId: async (userId) => {
        const response = await axios.get(`${API_URL}${path}/user/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
            // withCredentials: true, // Para incluir cookies en la solicitud
        });
        return response.data;
    },

    // Obtener un perfil por ID
    getProfileById: async (idProfile) => {
        const response = await axios.get(`${API_URL}${path}/${idProfile}`, {
            headers: { 'Content-Type': 'application/json' },
            // withCredentials: true, // Para incluir cookies en la solicitud
        });
        return response.data;
    },

    // Crear un nuevo perfil
    addProfile: async (profileData) => {
        const response = await axios.post(`${API_URL}${path}`, profileData, {
            headers: { 'Content-Type': 'application/json' },
            // withCredentials: true, // Para incluir cookies en la solicitud
        });
        return response.data;
    },

    // Actualizar un perfil por ID
    updateProfileById: async (idProfile, profileData) => {
        const response = await axios.put(`${API_URL}${path}/${idProfile}`, profileData, {
            headers: { 'Content-Type': 'application/json'}
            // withCredentials: true, // Para incluir cookies en la solicitud
        });
        return response.data;
    },

    // Eliminar un perfil por ID
    deleteProfileById: async (idProfile) => {
        const response = await axios.delete(`${API_URL}${path}/${idProfile}`, {
            headers: { 'Content-Type': 'application/json' },
            // withCredentials: true, // Para incluir cookies en la solicitud
        });
        return response.data;
    }
};

export default profilesService;
