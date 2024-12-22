import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';


const API_URL = constantesComunes.URLEstadistica;
const path = "languages";

const languagesService = {
    // Obtener todos los idiomas
    getAllLanguages: async () => {
        const response = await axios.get(`${API_URL}${path}`);
        return response.data;
    },

    // Crear un nuevo idioma
    addLanguage: async (language) => {
        const formData = new URLSearchParams();
    formData.append('name', language);
        const response = await axios.post(`${API_URL}${path}`, language, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
        return response;
    },

    // Actualizar un idioma
    actualizarLanguage: async (idLanguage, name) => {
        const formData = new URLSearchParams();
        formData.append("idLanguage", idLanguage);
        formData.append("name", name);

        const response = await axios.put(`${API_URL}${path}`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        });
        return response.data;
    },

    // Eliminar un idioma
    eliminarLanguage: async (idLanguage) => {
        
        

        const response = await axios.delete(`${API_URL}${path}/${idLanguage}`);
        // const formData = new URLSearchParams();
        // formData.append("idLanguage", idLanguage);
        

        // const response = await axios.delete(`${API_URL}${path}/${idLanguage}`, {
        //     data: formData,
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        // });
        return response.data;
    },
    // Eliminar un idioma
    eliminarLanguageForm: async (idLanguage) => {
        
        

        // const response = await axios.delete(`${API_URL}${path}/${idLanguage}`);
        const formData = new URLSearchParams();
        formData.append("idLanguage", idLanguage);
        

        const response = await axios.delete(`${API_URL}${path}`, {
            data: formData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        });
        return response.data;
    }
};

export default languagesService;