import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLEstadistica;
const path = "reviews";

const reviewsService = {
    // Agregar una nueva reseña
    addReview: async (review) => {
        const formData = new URLSearchParams();
        formData.append("rating", review.rating);
        formData.append("commentary", review.commentary);
        formData.append("idProfile", review.idProfile);
        formData.append("idContent", review.idContent);
        formData.append("contentType", review.contentType);
        const response = await axios.post(`${API_URL}${path}`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Actualizar una reseña por ID
    updateReview: async (idReview, updatedFields) => {
        const formData = new URLSearchParams();
        if (updatedFields.rating) formData.append("rating", updatedFields.rating);
        if (updatedFields.commentary) formData.append("commentary", updatedFields.commentary);
        if (updatedFields.idProfile) formData.append("idProfile", updatedFields.idProfile);
        if (updatedFields.idContent) formData.append("idContent", updatedFields.idContent);

        const response = await axios.put(`${API_URL}${path}/${idReview}`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    },

    // Eliminar una reseña por ID
    deleteReview: async (idReview) => {
        const response = await axios.delete(`${API_URL}${path}/${idReview}`);
        return response.data;
    },

    // Obtener todas las reseñas
    getAllReviews: async () => {
        const response = await axios.get(`${API_URL}${path}/all`);
        return response.data;
    },

    // Obtener una reseña por ID
    getReviewById: async (idReview) => {
        const response = await axios.get(`${API_URL}${path}/${idReview}`);
        return response.data;
    },

    // Obtener reseñas por ID de contenido
    getReviewsByContentId: async (idContent) => {
        const response = await axios.get(`${API_URL}${path}/contents`, {
            headers: { 'Content-Type': 'application/json' },
            params: { idContent },
        });
        return response.data;
    },

    // Obtener reseñas por ID de perfil
    getReviewsByProfileId: async (idProfile) => {
        const response = await axios.get(`${API_URL}${path}/profiles`, {
            params: { idProfile },
        });
        return response.data;
    },

    // Obtener reseñas por calificación exacta
    getReviewsByRating: async (rating) => {
        const response = await axios.get(`${API_URL}${path}/ratings`, {
            params: { idRating: rating },
        });
        return response.data;
    },

    // Obtener reseñas con calificación mínima
    getReviewsByMinRating: async (rating) => {
        const response = await axios.get(`${API_URL}${path}/minrating`, {
            params: { rating },
        });
        return response.data;
    },

    // Obtener reseñas con calificación máxima
    getReviewsByMaxRating: async (rating) => {
        const response = await axios.get(`${API_URL}${path}/maxrating`, {
            params: { rating },
        });
        return response.data;
    },

    // Obtener reseñas con comentarios
    getReviewsWithCommentary: async () => {
        const response = await axios.get(`${API_URL}${path}/comments`);
        return response.data;
    },

    // Obtener reseñas sin comentarios
    getReviewsWithoutCommentary: async () => {
        const response = await axios.get(`${API_URL}${path}/nocomments`);
        return response.data;
    },

    // Obtener estadísticas de reseñas por contenido
    getReviewStatsByContentId: async (idContent) => {
        const response = await axios.get(`${API_URL}${path}/stats`, {
            params: { idContent },
        });
        return response.data;
    },
};

export default reviewsService;
