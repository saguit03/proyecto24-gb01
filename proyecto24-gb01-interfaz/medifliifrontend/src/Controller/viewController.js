import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLEstadistica;
const path = "views";

const viewsService = {
    // Crear una nueva vista
    addView: async (view) => {
        const formData = new URLSearchParams();
        formData.append("dateInit", view.dateInit);
        formData.append("dateFinish", view.dateFinish || ""); // Manejar caso null
        formData.append("idContent", view.idContent);
        formData.append("idProfile", view.idProfile);

        const response = await axios.post(`${API_URL}${path}`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Actualizar una vista (form-based)
    putViewForm: async (view) => {
        const formData = new URLSearchParams();
        formData.append("idView", view.idView);
        formData.append("dateFinish", view.dateFinish);

        const response = await axios.put(`${API_URL}${path}`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Eliminar una vista (form-based)
    deleteViewForm: async (idView) => {
        const formData = new URLSearchParams();
        formData.append("idView", idView);

        const response = await axios.delete(`${API_URL}${path}`, {
            data: formData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Actualizar una vista (query-param-based)
    putViewParam: async (idView, dateFinish) => {
        const response = await axios.put(`${API_URL}${path}/${idView}`, null, {
            params: { idView, dateFinish },
        });
        return response.data;
    },

    // Eliminar una vista (query-param-based)
    deleteViewParam: async (idView) => {
        const response = await axios.delete(`${API_URL}${path}/${idView}`, {
            params: { idView },
        });
        return response.data;
    },

    // Obtener todas las vistas
    getAllViews: async () => {
        const response = await axios.get(`${API_URL}${path}/all`);
        return response.data;
    },

    // Obtener vista por ID
    getViewById: async (idView) => {
        const response = await axios.get(`${API_URL}${path}/${idView}`, {
            params: { idView },
        });
        return response.data;
    },

    // Obtener vistas por idContent
    getViewsByIdContent: async (idContent) => {
        const response = await axios.get(`${API_URL}${path}/viewsByIdContent`, {
            params: { idContent },
        });
        return response.data;
    },

    // Obtener vistas por idProfile
    getViewsByIdProfile: async (idProfile) => {
        const response = await axios.get(`${API_URL}${path}/viewsByIdProfile`, {
            params: { idProfile },
        });
        return response.data;
    },

    // Obtener estadísticas de vistas por idContent
    getStatsView: async (idContent) => {
        const response = await axios.get(`${API_URL}${path}/stats`, {
            params: { idContent },
        });
        return response.data;
    },
};

export default viewsService;
