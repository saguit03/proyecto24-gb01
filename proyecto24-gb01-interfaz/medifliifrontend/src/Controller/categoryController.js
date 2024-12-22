import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLContenido;
const path = "categories";

const categoriesService = {
    // Crear una nueva categoría
    addCategory: async (category) => {
        const formData = new URLSearchParams();
        formData.append("name", category.name);

        const response = await axios.post(`${API_URL}${path}/categoryAdded`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Obtener todas las categorías
    getAllCategories: async () => {
        const response = await axios.get(`${API_URL}${path}/categoriesListed`);
        return response.data;
    },

    // Obtener una categoría por ID
    getCategoryById: async (idCategory) => {
        const response = await axios.get(`${API_URL}${path}/categoryFound`, {
            params: { idCategory },
        });
        return response.data;
    }
};

export default categoriesService;
