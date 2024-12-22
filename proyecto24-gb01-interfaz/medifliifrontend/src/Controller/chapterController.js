import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLContenido;
const path = "chapters";

const chaptersService = {
    // Agregar un nuevo capítulo
    addChapter: async (chapter) => {
        const formData = new URLSearchParams();
        formData.append('title', chapter.title);
        formData.append('duration', chapter.duration);
        formData.append('urlVideo', chapter.urlVideo);
        formData.append('chapterNumber', chapter.chapterNumber);

        const response = await axios.post(`${API_URL}${path}`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
        return response.data;
    },

    // Eliminar un capítulo por ID
    deleteChapter: async (idChapter) => {
        const formData = new URLSearchParams();
        formData.append('idChapter', idChapter);

        // const response = await axios.delete(`${API_URL}${path}/deleteChapter`, formData, {
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // });
        const response = await axios.delete(`${API_URL}${path}/${idChapter}`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
        return response.data;
    },

    // Actualizar un capítulo por ID
    updateChapter: async (idChapter, updatedFields) => {
        const formData = new URLSearchParams();
        formData.append('idChapter', idChapter);

        if (updatedFields.title) formData.append('title', updatedFields.title);
        if (updatedFields.duration) formData.append('duration', updatedFields.duration);
        if (updatedFields.urlVideo) formData.append('urlVideo', updatedFields.urlVideo);
        if (updatedFields.chapterNumber) formData.append('chapterNumber', updatedFields.chapterNumber);

        const response = await axios.put(`${API_URL}${path}`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
        return response.data;
    },

    // Obtener un capítulo por ID
    getChapterById: async (idChapter) => {
        // const response = await axios.get(`${API_URL}${path}/chapterFound`, {
        //     params: { idChapter },
        // });
        const response = await axios.get(`${API_URL}${path}/${idChapter}`);
        return response.data;
    },
};

export default chaptersService;
