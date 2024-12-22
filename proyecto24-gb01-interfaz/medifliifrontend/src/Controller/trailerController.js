import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLContenido; // Base URL definida en constantesComunes
const path = "trailers"; // Ruta base para los endpoints relacionados con tráileres

const trailersService = {
    // Crear un nuevo tráiler
    addTrailer: async (trailer) => {
        const formData = new URLSearchParams();
        formData.append("title", trailer.title);
        formData.append("duration", trailer.duration);
        formData.append("urlVideo", trailer.urlVideo);
        trailer.language.forEach((lang) => formData.append("language[]", lang));
        trailer.category.forEach((cat) => formData.append("category[]", cat));
        trailer.character.forEach((char) => formData.append("character[]", char));
        trailer.participant.forEach((part) => formData.append("participant[]", part));

        const response = await axios.post(`${API_URL}${path}/addTrailer`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Obtener un tráiler por su ID
    getTrailerById: async (idTrailer) => {
        const response = await axios.get(`${API_URL}${path}/trailerFound`, {
            params: { idTrailer },
        });
        return response.data;
    },

    // Actualizar un tráiler por su ID
    updateTrailer: async (idTrailer, updatedFields) => {
        const formData = new URLSearchParams();
        formData.append("_method", "PUT");
        formData.append("idTrailer", idTrailer);

        if (updatedFields.title) formData.append("title", updatedFields.title);
        if (updatedFields.duration) formData.append("duration", updatedFields.duration);
        if (updatedFields.urlVideo) formData.append("urlVideo", updatedFields.urlVideo);
        if (updatedFields.language) {
            updatedFields.language.forEach((lang) => formData.append("language[]", lang));
        }
        if (updatedFields.category) {
            updatedFields.category.forEach((cat) => formData.append("category[]", cat));
        }
        if (updatedFields.character) {
            updatedFields.character.forEach((char) => formData.append("character[]", char));
        }
        if (updatedFields.participant) {
            updatedFields.participant.forEach((part) => formData.append("participant[]", part));
        }

        const response = await axios.post(`${API_URL}${path}/updateTrailer`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Eliminar un tráiler por su ID
    deleteTrailer: async (idTrailer) => {
        const formData = new URLSearchParams();
        formData.append("_method", "DELETE");
        formData.append("idTrailer", idTrailer);

        const response = await axios.post(`${API_URL}${path}/deleteTrailer`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },
};

export default trailersService;
